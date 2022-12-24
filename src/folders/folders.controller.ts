import { Controller } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @MessagePattern({
    entity: 'folder',
    cmd: 'create-one',
  })
  async createOne() {
    // create one
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'get-one',
  })
  getOne() {
    // get one
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'get-many',
  })
  getMany() {
    // get many
  }

  @MessagePattern({
    entity: 'folder',
    cmd: 'update-one',
  })
  updateOne() {
    // update one
  }
}
