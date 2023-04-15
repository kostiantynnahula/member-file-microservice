import { Controller } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FilesService } from './../files/files.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFolderInput } from './inputs/create.input';
import { UpdateFolderInput } from './inputs/update.input';
import { GetManyFolderInput } from './inputs/get-many.input';
import { DeleteOneFolderInput } from './inputs/delete-one.input';
import { GetOneFolderInput } from './inputs/get-one.input';
import { S3FileService } from './../utils/services/S3File.service';

@Controller('folders')
export class FoldersController {
  constructor(
    private readonly foldersService: FoldersService,
    private readonly filesService: FilesService,
    private readonly s3FileService: S3FileService,
  ) {}

  @MessagePattern({
    entity: 'folder',
    cmd: 'create-one',
  })
  async createOne(@Payload() payload: CreateFolderInput) {
    return await this.foldersService.createOne(payload);
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'get-one',
  })
  async getOne(@Payload() payload: GetOneFolderInput) {
    const { _id, user_id } = payload;

    return await this.foldersService.getOne(_id, user_id);
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'get-many',
  })
  async getMany(@Payload() payload: GetManyFolderInput) {
    const list = await this.foldersService.getMany(payload);

    if (payload.folder_id) {
      const { parents } = await this.foldersService.getOne(
        payload.folder_id,
        payload.user_id,
      );

      return { list, parents };
    }

    return { list, parents: [] };
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'update-one',
  })
  async updateOne(@Payload() payload: UpdateFolderInput) {
    const { _id, user_id, ...data } = payload;
    return await this.foldersService.updateOne(_id, user_id, data);
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'delete-one',
  })
  async deleteOne(@Payload() payload: DeleteOneFolderInput) {
    const ids = await this.foldersService.deleteOne(payload);
    const files = await this.filesService.getFilesByFolderIds(ids);
    await this.filesService.deleteByFolderIds(ids);
    if (files) {
      const fileKeys = files.map((file) => file.key);
      await this.s3FileService.deleteFiles(fileKeys);
    }
    return true;
  }
}
