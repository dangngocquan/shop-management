import { Body, Controller, Get, Param, Post, Put, Query, Delete} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('all')
    async getAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async getUserByParam(@Param() params: any): Promise<User> {
        return await this.usersService.findOne(params.id);
    }

    @Get()
    async getUserByQuery(@Query('id') id): Promise<User> {
        return await this.usersService.findOne(id);
    }


    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = new User();
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        return await this.usersService.create(user);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
        return 'This action updates a user with id ' + id + '.';
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        return await this.usersService.remove(id);
    }
}