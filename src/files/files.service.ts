import { Injectable } from '@nestjs/common';
import { FileDocument, File } from './file.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFileInput } from './inputs/create.input';
import { UpdateFileInput } from './inputs/update.input';
import { GetManyFilesInput } from './inputs/get-many.input';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  async createOne(data: CreateFileInput): Promise<File> {
    const file = new this.fileModel(data);
    const res = file.save();
    return res as unknown as File;
  }

  async getOne(_id: string, user_id: string): Promise<File> {
    return this.fileModel
      .findOne({ _id: _id, user_id: user_id })
      .exec() as unknown as File;
  }

  async getMany(params: GetManyFilesInput): Promise<File[]> {
    const { user_id, folder_id } = params;
    const res = this.fileModel
      .find({ user_id: user_id, folder_id: folder_id })
      .exec();
    return res as unknown as File[];
  }

  async updateOne(
    _id: string,
    user_id: string,
    data: Omit<UpdateFileInput, '_id' | 'user_id'>,
  ): Promise<File> {
    return await this.fileModel.findByIdAndUpdate(
      { _id: _id, user_id: user_id },
      { ...data },
    );
  }

  async deleteOne(_id: string, user_id: string): Promise<void> {
    await this.fileModel.findByIdAndDelete({ _id: _id, user_id: user_id });
  }

  async deleteByFolderIds(ids: string[]): Promise<void> {
    await this.fileModel.deleteMany({
      folder_id: { $in: ids },
    });
  }

  async getFilesByFolderIds(ids: string[]): Promise<File[]> {
    const files = (await this.fileModel
      .find({
        folder_id: { $in: ids },
      })
      .exec()) as unknown as File[];
    return files;
  }
}
