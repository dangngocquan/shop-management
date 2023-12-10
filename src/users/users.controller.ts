import { Body, Controller, Get, Param, Post, Put, Query, Delete, ParseIntPipe} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users Controller')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('all')
    async getAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get()
    async getUser(@Query('id', ParseIntPipe) id, @Query('username') username, @Query('password') password): Promise<User> {
        const options = {};
        if (id !== undefined) options['id'] = id;
        if (username !== undefined) options['username'] = username;
        if (password !== undefined) options['password'] = password;
        return await this.usersService.findOne(options);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = new User();
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        return await this.usersService.create(user);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() updateUserDto: UpdateUserDto) {
        const user = new User();
        user.password = updateUserDto.password;
        return await this.usersService.update(id, user);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id) {
        return await this.usersService.remove(id);
    }
}