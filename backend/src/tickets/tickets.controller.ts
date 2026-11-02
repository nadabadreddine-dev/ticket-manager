import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { Request } from 'express';
import { request } from 'http';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Roles('employee', 'agent', 'admin')
  @Post()
  create(
    @Body() createTicketDto: CreateTicketDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.ticketsService.create(createTicketDto, request.user.id);
  }

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.ticketsService.findAll(request.user.id, request.user.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.ticketsService.findOne(+id, request.user.id, request.user.role);
  }
  @Roles('agent', 'admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.ticketsService.update(
      +id,
      updateTicketDto,
      request.user.id,
      request.user.role,
    );
  }
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.ticketsService.remove(+id, request.user.id, request.user.role);
  }
}
