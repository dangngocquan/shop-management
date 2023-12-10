import { Body, Controller, Get, Param, Post, Put, Query, Delete, ParseIntPipe} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products Controller')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('all')
    async getAll(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    @Get()
    async getUser(@Query('id', ParseIntPipe) id): Promise<Product> {
        return await this.productsService.findOne(id);
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        const product = new Product();
        product.name = createProductDto.name;
        product.price = createProductDto.price;
        product.shopId = createProductDto.shopId;
        return await this.productsService.create(product);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() updateProductDto: UpdateProductDto) {
        const product = new Product();
        product.name = updateProductDto.name;
        product.price = updateProductDto.price;
        product.shopId = updateProductDto.shopId;
        return await this.productsService.update(id, product);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id) {
        return await this.productsService.remove(id);
    }
}