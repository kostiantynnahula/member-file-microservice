import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateFolderInput {
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
