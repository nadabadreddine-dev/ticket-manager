import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TicketPriority } from '../entities/ticket.entity.js';

export class CreateTicketDto {

     @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title!: string;


  @IsString()
  @IsNotEmpty()
  description!: string;
@IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;
}
