import { IsDefined, IsOptional } from 'class-validator';

export class GetManyFilesInput {
  @IsDefined()
  user_id: string;

  @IsOptional()
  folder_id: string;
}
