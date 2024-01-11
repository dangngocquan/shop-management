import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./entities/user.entity";
import { UserRole } from "./entities/user-role.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserRole)
        private userRolesRepository: Repository<UserRole>,
    ) {}

    async create(user: User) {
        return this.usersRepository.save(user);
    }

    async addRole(user: User, roleId: number) {
        const userRole = new UserRole();
        userRole.userId = user.id;
        userRole.roleId = roleId;
        return this.userRolesRepository.save(userRole);
    }

    async removeRole(user: User, roleId: number) {
        const userRole = await this.userRolesRepository.findOne({
            where: {
                userId: user.id,
                roleId: roleId
            }
        });
        return await this.userRolesRepository.delete(userRole.id);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find({
            relations: ['userRoles'],
            // loadRelationIds: true,
        });
    }

    findOne(options): Promise<User> {
        return this.usersRepository.findOne({
            where: {
                ...options,
            },
            relations: ['userRoles'],
            // loadRelationIds: true,
        })
    }

    getUserRoles(options): Promise<UserRole[]> {
        return this.userRolesRepository.find({
            where: {
                ...options,
            },
            relations: ['user', 'role'],
        })
    }

    async update(id: number, user: User): Promise<any> {
        const userUpdate = await this.usersRepository.findOneBy({ id });
        userUpdate.password = user.password;
        return this.usersRepository.save(userUpdate);
    }

    async remove(id: number): Promise<any> {
        return await this.usersRepository.delete(id);
    }
}