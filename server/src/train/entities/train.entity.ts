import { InjectRepository } from "@nestjs/typeorm";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from "typeorm";

@Entity()
export class Train {
    constructor(
        @InjectRepository(Train)
        private readonly trainRepository: Repository <Train>
    ){}

    @PrimaryGeneratedColumn({ name: 'train_id'})
    id: number

    @Column()
    startCity: string

    @Column()
    endCity: string

    @Column("timestamp")
    departure: Date

    @Column("timestamp")
    arrival: Date

    @Column()
    availableSeats: number;

    @Column()
    price: number;
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
