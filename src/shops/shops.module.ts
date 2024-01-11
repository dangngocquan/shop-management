import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ShopController } from './shops.controller';
import { ShopsService } from './shops.sevice';
import { CaslModule } from 'src/auths/casl/casl.module';

@Module({
    imports: [TypeOrmModule.forFeature([Shop]), CaslModule],
    controllers: [ShopController],
    providers: [ShopsService],
    exports: [ShopsService]
})
export class ShopsModule {}