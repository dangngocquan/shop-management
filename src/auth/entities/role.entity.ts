import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('role')
export class Role {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;
}
