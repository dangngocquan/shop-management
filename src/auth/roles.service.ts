import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from "./entities/role.entity";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
      ) {}

    async create(role: Role) {
        return this.rolesRepository.save(role);
    }

    findAll(): Promise<Role[]> {
        return this.rolesRepository.find();
    }

    findOne(id: number): Promise<Role> {
        return this.rolesRepository.findOneBy({ id })
    }

    async update(id: number, role: Role): Promise<any> {
        const roleUpdate = await this.rolesRepository.findOneBy({ id });
        roleUpdate.name = role.name;
        return this.rolesRepository.save(roleUpdate);
    }

    async remove(id: number): Promise<any> {
        return await this.rolesRepository.delete(id);
    }
}