import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Train } from './entities/train.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainService {
  constructor(
    @InjectRepository(Train) private readonly trainRepository: Repository<Train>,
  ){}

  async create(createTrainDto: CreateTrainDto) {
    const train = await this.trainRepository.save({
      startCity: createTrainDto.startCity,
      endCity: createTrainDto.endCity,
      dispatch: createTrainDto.dispatch,
      arrival: createTrainDto.dispatch
    })

    return {train}
  }

  async findAll() {
    return await this.trainRepository.find();
  }

  async findOne(id: number) {
    const exist = await this.trainRepository.findOne({
      where: {id}
    })
    if(!exist) throw new NotFoundException('Train not found')
    return exist;
  }

  async remove(id: number) {
    const train = await this.trainRepository.findOne({
      where: {id}
    })

    if (!train) throw new NotFoundException('Train not found')

    return await this.trainRepository.delete(id);
  }
}
