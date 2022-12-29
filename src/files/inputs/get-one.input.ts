import { IsDefined } from 'class-validator';

export class GetOneFileInput {
  @IsDefined()
  _id: string;

  @IsDefined()
  user_id: string;
}
