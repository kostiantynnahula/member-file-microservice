import { Injectable } from '@nestjs/common';
import { FolderDocument, Folder } from './folder.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFolderInput } from './inputs/create.input';
import { UpdateFolderInput } from './inputs/update.input';
import { GetManyFolderInput } from './inputs/get-many.input';
import { DeleteOneFolderInput } from './inputs/delete-one.input';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel(Folder.name)
    private readonly folderModel: Model<FolderDocument>,
  ) {}

  async createOne(data: CreateFolderInput): Promise<Folder> {
    const folder = new this.folderModel(data);
    const res = folder.save();
    return res as unknown as Folder;
  }

  async getOne(_id: string, user_id: string): Promise<Folder> {
    return this.folderModel
      .findOne({ _id: _id, user_id: user_id })
      .exec() as unknown as Folder;
  }

  async getMany(params: GetManyFolderInput): Promise<Folder[]> {
    const { page, limit, user_id } = params;
    const res = this.folderModel
      .find({ user_id: user_id })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    return res as unknown as Folder[];
  }

  async updateOne(
    _id: string,
    user_id: string,
    data: Omit<UpdateFolderInput, '_id' | 'user_id'>,
  ): Promise<Folder> {
    return this.folderModel.findByIdAndUpdate(
      { id: _id, user_id: user_id },
      { ...data },
    ) as unknown as Folder;
  }

  async deleteOne(params: DeleteOneFolderInput): Promise<void> {
    const { _id, user_id } = params;
    this.folderModel.findByIdAndDelete({ id: _id, user_id: user_id });
  }
}
