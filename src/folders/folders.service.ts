import { Injectable } from '@nestjs/common';
import { FolderDocument, Folder } from './folder.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel(Folder.name)
    private readonly folderModel: Model<FolderDocument>,
  ) {}

  async createOne(data: Folder): Promise<Folder> {
    const folder = new this.folderModel(data);
    const res = folder.save();
    return res as unknown as Folder;
  }

  async getOne(_id: string): Promise<Folder> {
    return this.folderModel.findOne({ _id: _id }).exec() as unknown as Folder;
  }

  async getMany(page = 1, limit = 10): Promise<Folder[]> {
    // get many
    const res = this.folderModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    return res as unknown as Folder[];
  }

  async updateOne(_id: string, data: Partial<Folder>): Promise<Folder> {
    return this.folderModel.findByIdAndUpdate(
      { id: _id },
      { ...data },
    ) as unknown as Folder;
  }

  async deleteOne(_id: string): Promise<void> {
    this.folderModel.findByIdAndDelete({ id: _id });
  }
}
