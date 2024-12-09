import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./category";

@Entity("Vendor")
class Vendor{
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;

    @Column()
    name: string;
    @Column()
    address: string;
    @Column()
    rating: string;
    @Column()
    isOfficial: boolean;
    @Column()
    inOperation: boolean;
    @Column({nullable: true})
    categoryId: string;
    
    @ManyToOne(() => Category, (category) => category.vendors, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({ name: "categoryId" })
    category: Category

    @CreateDateColumn()
    created_at!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}
export {Vendor}