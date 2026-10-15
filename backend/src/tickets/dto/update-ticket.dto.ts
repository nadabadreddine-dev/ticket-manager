import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto.js';
import { IsEnum, IsOptional } from 'class-validator';
import { TicketStatus } from '../entities/ticket.entity.js';
export class UpdateTicketDto extends PartialType(CreateTicketDto) {

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;
}
