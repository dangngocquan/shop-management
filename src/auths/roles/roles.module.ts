import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RolesController],
    providers: [
        RolesService
    ],
    exports: [RolesService],
})
export class RolesModule {}