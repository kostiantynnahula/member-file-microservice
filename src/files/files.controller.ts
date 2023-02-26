import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilesService } from './files.service';
import { CreateFileInput } from './inputs/create.input';
import { UpdateFileInput } from './inputs/update.input';
import { GetManyFilesInput } from './inputs/get-many.input';
import { GetOneFileInput } from './inputs/get-one.input';
import { DeleteOneFileInput } from './inputs/delete-one.input';

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
    return await this.service.getMany(payload);
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'get-one',
  })
  async getOne(@Payload() payload: GetOneFileInput) {
    const { _id, user_id } = payload;
    return await this.service.getOne(_id, user_id);
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'update-one',
  })
  async updateOne(@Payload() payload: UpdateFileInput) {
    const { _id, user_id, ...data } = payload;
    return await this.service.updateOne(_id, user_id, data);
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'delete-one',
  })
  async deleteOne(@Payload() payload: DeleteOneFileInput) {
    const { _id, user_id } = payload;
    await this.service.deleteOne(_id, user_id);
    return { _id };
  }
}
