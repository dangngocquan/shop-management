import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    async create(user: User) {
        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id })
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