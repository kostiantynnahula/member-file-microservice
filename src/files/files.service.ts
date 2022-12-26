import { Injectable } from '@nestjs/common';
import { FileDocument, File } from './file.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  async createOne(data: File): Promise<File> {
    const file = new this.fileModel(data);
    const res = file.save();
    return res as unknown as File;
  }

  async getOne(_id: string): Promise<File> {
    return this.fileModel.findOne({ _id: _id }).exec() as unknown as File;
  }

  async getMany(page = 1, limit = 10): Promise<File[]> {
    const res = this.fileModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    return res as unknown as File[];
  }

  async updateOne(_id: string, data: Partial<File>): Promise<File> {
    return this.fileModel.findByIdAndUpdate(
      { id: _id },
      { ...data },
    ) as unknown as File;
  }

  async deleteOne(_id: string): Promise<void> {
    this.fileModel.findByIdAndDelete({ id: _id });
  }
}
