import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateFolderInput {
  @IsDefined()
  _id: string;

  @IsOptional()
  @IsNotEmpty()
  name: string;
}
