import { IsDefined } from 'class-validator';

export class DeleteOneFolderInput {
  @IsDefined()
  _id: string;

  @IsDefined()
  user_id: string;
}
