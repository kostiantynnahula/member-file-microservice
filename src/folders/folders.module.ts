import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FolderSchema, Folder } from './folder.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './../files/files.module';
import { S3FileService } from './../utils/services/S3File.service';

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
  providers: [FoldersService, S3FileService],
  controllers: [FoldersController],
})
export class FoldersModule {}
