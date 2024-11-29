import { Exclude } from 'class-transformer';
import { CreateUserDto } from '../dto/create-user.dto';

export class User extends CreateUserDto {
  id: string;

  @Exclude()
  password: string;
}
