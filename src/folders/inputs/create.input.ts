import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFolderInput {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  user_id: string;

  @IsOptional()
  @IsNotEmpty()
  folder_id?: string;
}
