import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity("payment")
class Payment{
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;
    @Column()
    date: Date;
    @Column()
    valor: number;
    @Column()
    metododePagamento: string
    @Column()
    status: string;
    @Column()
    parcelamento: number
}
export {Payment}