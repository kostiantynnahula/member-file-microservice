import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { ParentFolder } from './../folder.schema';

export class UpdateFolderInput {
  @IsDefined()
  _id: string;

  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  user_id: string;

  @IsDefined()
  parents: ParentFolder[];
}
