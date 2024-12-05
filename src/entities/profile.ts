import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid";
import { User } from "./user";
@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
      id: string
      @Column()
      name: string

    @OneToMany(() => User, (user) => user.profile, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({ name: "profileId" })
    users: User[]

      @CreateDateColumn()
      created_at!: Date;
    
      @UpdateDateColumn()
      updated_at!: Date;
    
}