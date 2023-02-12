import { IsDefined, IsOptional } from 'class-validator';

export class GetManyFolderInput {
  @IsDefined()
  page?: number;

  @IsDefined()
  limit?: number;

  @IsDefined()
  user_id: string;

  @IsOptional()
  parent_id?: string;
}
