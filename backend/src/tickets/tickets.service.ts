import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity.js';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
  ) {}

 create(createTicketDto: CreateTicketDto) {
    const ticket = this.ticketsRepository.create(createTicketDto);
    return this.ticketsRepository.save(ticket);
  }


  findAll() {
    return this.ticketsRepository.find({order:{createdAt: 'DESC'}});
  }

 async findOne(id: number) {
    const ticket = await this.ticketsRepository.findOneBy({ id });
    if (!ticket){
      throw new NotFoundException(`ticket ${id} introuvable`)
    }
    return ticket ;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
