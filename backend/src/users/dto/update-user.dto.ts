import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Adresse e-mail invalide' })
  email?: string;
}
