import { IsDefined } from 'class-validator';

export class GetManyFolderInput {
  @IsDefined()
  page: number;

  @IsDefined()
  limit: number;

  @IsDefined()
  user_id: string;
}
