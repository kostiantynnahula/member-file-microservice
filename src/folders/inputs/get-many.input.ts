import { IsDefined, IsOptional } from 'class-validator';

export class GetManyFolderInput {
  @IsDefined()
  user_id: string;

  @IsOptional()
  folder_id?: string;
}
