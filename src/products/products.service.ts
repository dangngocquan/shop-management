import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    async create(product: Product) {
        return this.productsRepository.save(product);
    }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: number): Promise<Product> {
        return this.productsRepository.findOneBy({ id })
    }

    async update(id: number, product: Product): Promise<any> {
        const productUpdate = await this.productsRepository.findOneBy({ id });
        productUpdate.name = product.name;
        productUpdate.price = product.price;
        productUpdate.shopId = product.shopId;
        return this.productsRepository.save(productUpdate);
    }

    async remove(id: number): Promise<any> {
        return await this.productsRepository.delete(id);
    }
}