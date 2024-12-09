import  { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

import { Client } from "./client";

@Entity("sale")
class Sale{
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string
    @Column()
    userId!: string
    @Column()
    productId!: string
    @Column()
    clientId!: string
    @Column()
    quantity: string

    @ManyToOne(() => User, (users) =>users.sales, {nullable:true, onDelete: "CASCADE"})
    @JoinColumn({ name: "userId"})
    user: User
    
    @ManyToOne(() => Product, (product)=> product.saleId, {nullable:true, onDelete: "CASCADE"})
    @JoinColumn({name: "productId"})
    product: Product

    @ManyToOne(()=> Client, (client) => client.sale)
    @JoinColumn({name: "clientId"})
    client!: Client

}

export { Sale }