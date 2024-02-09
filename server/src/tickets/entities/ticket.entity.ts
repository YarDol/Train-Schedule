import { Train } from "src/train/entities/train.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryColumn({name: 'ticket_id'})
    id: number

    @Column({nullable: true})
    number: number

    @ManyToOne(() => User, (user) => user.ticket)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => Train, (train) => train.ticket)
    @JoinColumn({name: 'train_id'})
    train: Train

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
