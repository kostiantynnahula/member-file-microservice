import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { Folder } from './../../folders/folder.schema';

export class UpdateFileInput {
  @IsDefined()
  @IsNotEmpty()
  _id: string;

  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  folder_id?: Folder;

  @IsDefined()
  user_id: string;
}
