import { IsOptional } from 'class-validator';

export class GetManyFilesInput {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
