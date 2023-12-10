import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('shop')
export class Shop {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({name: 'owner_id', type: 'bigint'})
    ownerId: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'owner_id'})
    user: User;
}
