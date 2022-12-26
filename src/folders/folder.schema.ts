import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { File } from './../files/file.schema';

@Schema({
  _id: true,
  timestamps: true,
})
export class Folder {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  files: File[];
}

export type FolderDocument = HydratedDocument<SchemaFactory>;
export const FolderSchema = SchemaFactory.createForClass(Folder);
