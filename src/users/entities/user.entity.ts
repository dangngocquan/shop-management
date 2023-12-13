import { Role } from 'src/auths/roles/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';


@Entity('user')
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({type: 'varchar', length: 255})
    username: string;

    @Column({type: 'varchar', length: 255})
    password: string;

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles: UserRole[];
}
