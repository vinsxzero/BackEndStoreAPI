import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Category } from "./category";
import { Sale } from "./sale";

@Entity("product")
class  Product {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @Column()
    price!: number;
    @Column({nullable: true})
    categoryId!: string;

    @Column({nullable: true})
    saleId!: string

    @ManyToOne(() => Category, (category) => category.products, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({ name: "categoryId" })
    category: Category
    
    @OneToMany(() => Sale,(sale)=> sale.product)
    @JoinColumn({name: "saleId"})
    sale: Sale

    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}

export { Product }