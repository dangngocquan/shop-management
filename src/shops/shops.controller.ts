import { Body, Controller, Get, Param, Post, Put, Query, Delete, ParseIntPipe, UseGuards} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShopsService } from './shops.sevice';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { PoliciesGuard } from 'src/auths/policy/policy.guard';
import { CheckPolicies } from 'src/auths/policy/policy.decorator';
import { AppAbility } from 'src/auths/casl/casl-ability.factory';
import { Action } from 'src/auths/casl/actions.enum';

@ApiTags('Shops Controller')
@Controller('shops')
export class ShopController {
    constructor(private shopsService: ShopsService) {}

    @Get('all')
    async getAll(): Promise<Shop[]> {
        return await this.shopsService.findAll();
    }

    @Get()
    async getShop(@Query('id', ParseIntPipe) id): Promise<Shop> {
        return await this.shopsService.findOne(id);
    }


    @Post()
    async create(@Body() createShopDto: CreateShopDto) {
        const shop = new Shop();
        shop.name = createShopDto.name;
        shop.ownerId = createShopDto.ownerId;
        return await this.shopsService.create(shop);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id, @Body()updateShopDto: UpdateShopDto) {
        const shop = new Shop();
        shop.name = updateShopDto.name;
        return await this.shopsService.update(id, shop);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id) {
        return await this.shopsService.remove(id);
    }
}