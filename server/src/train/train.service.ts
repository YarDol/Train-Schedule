import { Injectable } from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Train } from './entities/train.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainService {
  constructor(
    @InjectRepository(Train) private readonly userRepository: Repository<Train>,
  ){}

  async create(createTrainDto: CreateTrainDto) {
    const train = await this.userRepository.save({
      startCity: createTrainDto.startCity,
      endCity: createTrainDto.endCity
    })

    return {train}
  }

  findAll() {
    return `This action returns all train`;
  }

  findOne(id: number) {
    return `This action returns a #${id} train`;
  }

  remove(id: number) {
    return `This action removes a #${id} train`;
  }
}
