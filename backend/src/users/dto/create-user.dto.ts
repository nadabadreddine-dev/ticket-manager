import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../users.entity.js';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
