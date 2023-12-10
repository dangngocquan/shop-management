import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';


@Entity('user')
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({type: 'varchar', length: 255})
    username: string;

    @Column({type: 'varchar', length: 255})
    password: string;
}
