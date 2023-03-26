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

  async getList(user_id: string): Promise<Folder[]> {
    const list = await this.folderModel.find({ user_id: user_id }).exec();
    return list as unknown as Folder[];
  }

  async getMany(params: GetManyFolderInput): Promise<Folder[]> {
    const { user_id, folder_id } = params;
    if (folder_id) {
      const res = this.folderModel
        .find({
          parents: { $elemMatch: { _id: folder_id, closest: true } },
          user_id: user_id,
        })
        .exec();

      return res as unknown as Folder[];
    } else {
      const res = this.folderModel
        .find({
          parents: { $size: 0 },
          user_id: user_id,
        })
        .exec();
      return res as unknown as Folder[];
    }
  }

  async updateOne(
    _id: string,
    user_id: string,
    data: Omit<UpdateFolderInput, '_id' | 'user_id'>,
  ): Promise<Folder> {
    const session = await this.folderModel.startSession();

    await session.startTransaction();

    const result = await this.folderModel.findByIdAndUpdate(
      { _id: _id, user_id: user_id },
      { ...data },
    );

    if (data.name) {
      await this.updateChildFolders(_id, data.name, user_id);
    }

    session.endSession();

    return result as unknown as Folder;
  }

  async updateChildFolders(
    parent_id: string,
    newName: string,
    user_id: string,
  ): Promise<void> {
    await this.folderModel.updateMany(
      {
        parents: { $elemMatch: { _id: parent_id } },
        user_id: user_id,
      },
      {
        $set: { 'parents.$[i].name': newName },
      },
      {
        arrayFilters: [
          {
            'i._id': parent_id,
          },
        ],
      },
    );
  }

  async deleteChilds(parent_id: string): Promise<void> {
    await this.folderModel.deleteMany({
      parents: { $elemMatch: { _id: parent_id } },
    });
  }

  async deleteOne(params: DeleteOneFolderInput): Promise<void> {
    const { _id, user_id } = params;
    const session = await this.folderModel.startSession();
    await this.folderModel.findByIdAndDelete({ _id: _id, user_id: user_id }); // delete folder
    await this.deleteChilds(_id); // delete childs
    session.endSession();
  }
}
