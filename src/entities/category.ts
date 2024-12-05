import  { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Product } from "./product";
import {Vendor} from "./vendor"

@Entity("category")
class  Category {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;
    @Column()
    name!: string;
    @Column()
    description!: string;
    
    @OneToMany(() => Product, (product) => product.category)
    products: Product[]

    @OneToMany(() => Vendor, (vendor) => vendor.category)
    vendors: Vendor
    
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}
export { Category }