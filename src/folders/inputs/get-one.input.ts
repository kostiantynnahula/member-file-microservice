import { IsDefined } from 'class-validator';

export class GetOneFolderInput {
  @IsDefined()
  _id: string;

  @IsDefined()
  user_id: string;
}
