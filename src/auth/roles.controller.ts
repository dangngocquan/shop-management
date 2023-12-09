import { Body, Controller, Get, Param, Post, Put, Query, Delete} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('auths/roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Get('all')
    async getAll(): Promise<Role[]> {
        return await this.rolesService.findAll();
    }

    @Get()
    async getRole(@Query('id') id): Promise<Role> {
        return await this.rolesService.findOne(id);
    }


    @Post()
    async create(@Body() createRoleDto: CreateRoleDto) {
        const role = new Role();
        role.name = createRoleDto.name;
        return await this.rolesService.create(role);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() updateRoleDto: UpdateRoleDto) {
        const role = new Role();
        role.name = updateRoleDto.name;
        return await this.rolesService.update(id, role);
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        return await this.rolesService.remove(id);
    }
}