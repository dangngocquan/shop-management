import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ShopController } from './shops.controller';
import { ShopsService } from './shops.sevice';

@Module({
    imports: [TypeOrmModule.forFeature([Shop])],
    controllers: [ShopController],
    providers: [ShopsService]
})
export class ShopsModule {}