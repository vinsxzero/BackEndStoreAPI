import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";
import { User } from "./user";
import { Sale } from "./sale";

@Entity("client")
class Client{
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;
    @Column()
    name!: string
    @Column()
    cpf!: string;
    @Column()
    address!: string;
    @Column()
    phone!: string;
    
    @OneToMany(() => User, (user) => user.clientId)
    users!: User[]

    @OneToMany(() => Sale, (sale) =>sale.client)
    sale!: Sale


    @CreateDateColumn()
    createdAt!: Date
    @UpdateDateColumn()
    updatedAt!: Date
}

export { Client }