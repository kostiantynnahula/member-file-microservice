import { Controller } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFolderInput } from './inputs/create.input';
import { UpdateFolderInput } from './inputs/update.input';
import { GetManyFolderInput } from './inputs/get-many.input';
import { DeleteOneFolderInput } from './inputs/delete-one.input';
import { GetOneFolderInput } from './inputs/get-one.input';

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
    cmd: 'get-many',
  })
  async getMany(@Payload() payload: GetManyFolderInput) {
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
    return await this.foldersService.deleteOne(payload);
  }
}
