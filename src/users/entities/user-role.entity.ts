import { Role } from 'src/auths/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';


@Entity('user_role')
export class UserRole {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({name: 'user_id', type: 'bigint'})
    userId: number;

    @Column({name: 'role_id', type: 'bigint'})
    roleId: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Role)
    @JoinColumn({name: 'role_id'})
    role: Role;
    
}
