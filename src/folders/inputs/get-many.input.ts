import { IsOptional } from 'class-validator';

export class GetManyFolderInput {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
