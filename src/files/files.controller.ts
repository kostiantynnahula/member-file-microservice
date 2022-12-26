import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilesService } from './files.service';
import { CreateFileInput } from './inputs/create.input';
import { UpdateFileInput } from './inputs/update.input';
import { GetManyFilesInput } from './inputs/get-many.input';

@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @MessagePattern({
    entity: 'files',
    cmd: 'create-one',
  })
  async createOne(@Payload() payload: CreateFileInput) {
    return await this.service.createOne(payload);
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'get-many',
  })
  async getMany(@Payload() payload: GetManyFilesInput) {
    return await this.service.getMany(payload.page, payload.limit);
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'get-one',
  })
  async getOne(_id) {
    return await this.service.getOne(_id);
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'update-one',
  })
  async updateOne(@Payload() payload: UpdateFileInput) {
    const { _id, ...data } = payload;
    return await this.service.updateOne(_id, data);
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'create-one',
  })
  async deleteOne(_id: string) {
    return await this.service.deleteOne(_id);
  }
}
