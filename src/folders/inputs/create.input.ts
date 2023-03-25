import { IsDefined, IsNotEmpty } from 'class-validator';
import { ParentFolder } from './../folder.schema';

export class CreateFolderInput {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  user_id: string;

  @IsDefined()
  parents: ParentFolder[];
}
