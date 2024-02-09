import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './entities/train.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Train])],
  controllers: [TrainController],
  providers: [TrainService],
})
export class TrainModule {}
