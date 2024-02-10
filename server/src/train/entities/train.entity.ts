import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from "typeorm";

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

    @Column()
    dispatch: string

    @Column()
    arrival: string

    @OneToMany(() => Ticket, (ticket) => ticket.train)
    ticket: Ticket

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
