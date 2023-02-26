import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Folder } from './../../folders/folder.schema';

export class CreateFileInput {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  folder_id?: Folder;

  @IsDefined()
  @IsNotEmpty()
  user_id: string;
}
