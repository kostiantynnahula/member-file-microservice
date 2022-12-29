import { IsDefined } from 'class-validator';

export class GetManyFilesInput {
  @IsDefined()
  page: number;

  @IsDefined()
  limit: number;

  @IsDefined()
  user_id: string;
}
