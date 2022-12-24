import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @MessagePattern({
    entity: 'files',
    cmd: 'create-one',
  })
  createOne() {
    // create one
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'get-many',
  })
  getMany() {
    // get many
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'get-one',
  })
  getOne() {
    // get one
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'update-one',
  })
  updateOne() {
    // update one
  }

  @MessagePattern({
    entity: 'files',
    cmd: 'create-one',
  })
  deleteOne() {
    // delete one
  }
}
