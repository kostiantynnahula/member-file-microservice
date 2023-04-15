import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Transform } from 'class-transformer';
import { Folder } from './../folders/folder.schema';

@Schema({
  _id: true,
  timestamps: true,
})
export class File {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Folder.name,
    required: false,
  })
  folder_id?: string;

  @Prop({
    required: true,
  })
  user_id: string;

  @Prop({
    required: true,
  })
  location: string;

  @Prop({
    required: true,
  })
  key: string;
}

export type FileDocument = HydratedDocument<SchemaFactory>;
export const FileSchema = SchemaFactory.createForClass(File);
