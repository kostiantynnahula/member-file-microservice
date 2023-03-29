import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FolderSchema, Folder } from './folder.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './../files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Folder.name,
        schema: FolderSchema,
      },
    ]),
    FilesModule,
  ],
  providers: [FoldersService],
  controllers: [FoldersController],
})
export class FoldersModule {}
