import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException('This email already exists');
    }

    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: hashedPassword,
    });

    return user;
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({where: {
      email,
    }})
  }

  async remove(id: number){
    const user = await this.userRepository.findOne({where: {id}});
    if(!user) throw new NotFoundException("User not found")
    return this.userRepository.remove(user);
  }
}
