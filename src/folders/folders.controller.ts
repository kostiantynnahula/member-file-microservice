import { Controller } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFolderInput } from './inputs/create.input';
import { UpdateFolderInput } from './inputs/update.input';
import { GetManyFolderInput } from './inputs/get-many.input';
import { DeleteOneFolderInput } from './inputs/delete-one.input';
import { GetOneFolderInput } from './inputs/get-one.input';
import { buildBreadcrumbTree } from './../utils/helpers/breadcrumb';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

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
    cmd: 'get-breadcrumb',
  })
  async getBreadcrumb(@Payload() payload: GetOneFolderInput) {
    const { _id, user_id } = payload;

    const folder = await this.foldersService.getOne(_id, user_id);

    const folders = await this.foldersService.getList(user_id);

    const breadcrumb = buildBreadcrumbTree(folders, folder);

    return breadcrumb;
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'get-many',
  })
  async getMany(@Payload() payload: GetManyFolderInput) {
    console.log(payload, 'payload');
    return await this.foldersService.getMany(payload);
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
    await this.foldersService.deleteOne(payload);
    return true;
  }
}
