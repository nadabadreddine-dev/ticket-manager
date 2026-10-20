import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity.js';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  private sanitizeUser(user: User) {
    const { passwordHash, ...result } = user;
    return result;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    if (!users) {
      throw new NotFoundException(`Utilisateurs introuvable`);
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Utilisateur ${id} introuvable`);
    }

    return user;
  }
  async create(data: CreateUserDto) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = this.usersRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });
    const savedUser = await this.usersRepository.save(user);
    return this.sanitizeUser(savedUser);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.usersRepository.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return { message: `Utilisateur ${id} supprimé` };
  }
}
