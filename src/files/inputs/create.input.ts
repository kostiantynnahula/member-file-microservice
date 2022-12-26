import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { Folder } from './../../folders/folder.schema';

export class CreateFileInput {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  folder?: Folder;
}
