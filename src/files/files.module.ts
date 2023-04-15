import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileSchema, File } from './file.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { S3FileService } from './../utils/services/S3File.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
  ],
  providers: [FilesService, S3FileService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
