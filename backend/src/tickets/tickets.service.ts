import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity.js';
import { User } from '../users/users.entity.js';
@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
  ) {}

  create(createTicketDto: CreateTicketDto, userId: number) {
    const ticket = this.ticketsRepository.create({
      ...createTicketDto,
      user: { id: userId },
    });
    return this.ticketsRepository.save(ticket);
  }

  findAll(userId: number, role: string) {
    if (role === 'employee') {
      return this.ticketsRepository.find({
        where: {
          user: { id: userId },
        },
        order: { createdAt: 'DESC' },
      });
    }
    return this.ticketsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number, userId: number, role: string) {
    const ticket = await this.ticketsRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!ticket) {
      throw new NotFoundException(`ticket ${id} introuvable`);
    }
    if (role === 'employee' && ticket.user.id !== userId) {
      throw new NotFoundException(`Ticket ${id} introuvable`);
    }
    return ticket;
  }

  async update(
    id: number,
    updateTicketDto: UpdateTicketDto,
    userId: number,
    role: string,
  ) {
    const ticket = await this.findOne(id, userId, role);
    Object.assign(ticket, updateTicketDto);
    return this.ticketsRepository.save(ticket);
  }

  async remove(id: number, userId: number, role: string) {
    const ticket = await this.findOne(id, userId, role);

    await this.ticketsRepository.remove(ticket);

    return { message: `Ticket ${id} supprimé` };
  }
}
