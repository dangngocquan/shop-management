import { Body, Controller, Get, Param, Post, Put, Query, Delete} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('all')
    async getAll(): Promise<any[]> {
        return this.usersService.getAll();
    }

    @Get(':id')
    async getUserByParam(@Param() params: any): Promise<any[]> {
        return [];
    }

    @Get()
    async getUserByQuery(@Query('id') id): Promise<any[]> {
        return [];
    }


    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        this.usersService.create(createUserDto);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
        return 'This action updates a user with id ' + id + '.';
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        return 'This action removes a user with id ' + id + '.';
    }
}