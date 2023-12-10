import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from "./entities/shop.entity";

@Injectable()
export class ShopsService {
    constructor(
        @InjectRepository(Shop)
        private shopsRepository: Repository<Shop>,
    ) {}

    async create(shop: Shop) {
        return this.shopsRepository.save(shop);
    }

    findAll(): Promise<Shop[]> {
        return this.shopsRepository.find();
    }

    findOne(id: number): Promise<Shop> {
        return this.shopsRepository.findOneBy({ id })
    }

    async update(id: number, shop: Shop): Promise<any> {
        const shopUpdate = await this.shopsRepository.findOneBy({ id });
        shopUpdate.name = shop.name;
        return this.shopsRepository.save(shopUpdate);
    }

    async remove(id: number): Promise<any> {
        return await this.shopsRepository.delete(id);
    }
}