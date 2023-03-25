import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { File } from './../files/file.schema';

export class ParentFolder {
  _id: string;
  name: string;
  closest?: boolean;
}

@Schema({
  _id: true,
  timestamps: true,
})
export class Folder {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  files: File[];

  @Prop({
    required: true,
    index: true,
    type: 'object',
  })
  parents: ParentFolder[] = [];

  @Prop({ required: true })
  user_id: string;
}

export type FolderDocument = HydratedDocument<SchemaFactory>;
export const FolderSchema = SchemaFactory.createForClass(Folder);
