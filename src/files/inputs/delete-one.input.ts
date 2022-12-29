import { IsDefined } from 'class-validator';

export class DeleteOneFileInput {
  @IsDefined()
  _id: string;

  @IsDefined()
  user_id: string;
}
