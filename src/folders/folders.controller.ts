import { Controller } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFolderInput } from './inputs/create.input';
import { UpdateFolderInput } from './inputs/update.input';
import { GetManyFolderInput } from './inputs/get-many.input';

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
  async getOne(_id: string) {
    return await this.foldersService.getOne(_id);
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'get-many',
  })
  async getMany(@Payload() payload: GetManyFolderInput) {
    return await this.foldersService.getMany(payload.page, payload.limit);
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'update-one',
  })
  async updateOne(@Payload() payload: UpdateFolderInput) {
    const { _id, ...data } = payload;
    return await this.foldersService.updateOne(_id, data);
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'delete-one',
  })
  async deleteOne(_id: string) {
    return await this.foldersService.deleteOne(_id);
  }
}
