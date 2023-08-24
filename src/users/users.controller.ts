import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    NotFoundException,
    Put,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GeneralResponse } from '@app/dto/response';
import { MapperUserImpl } from './dto/mapper-user-impl';
import { ShowUserDto } from './dto/show-user.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { User } from './entities/user.entity';
import { QueryParamsUserDto } from './dto/query-param-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly mapper: MapperUserImpl,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        let user = await this.usersService.create(createUserDto);
        let showUser = this.mapper.toShow(user);
        let response = new GeneralResponse<ShowUserDto>().toObject(
            HttpStatus.CREATED,
            'User created',
            showUser,
        );
        return response;
    }

    @Get('/get')
    async getAll(@Query() queryParams: QueryParamsUserDto) {
        let users = await this.usersService.getAll(queryParams);
        let showUsers = this.mapper.toShowArray(users);
        let response = new GeneralResponse<ShowUserDto>().toArray(
            HttpStatus.OK,
            'List users',
            showUsers,
        );
        return response;
    }

    @Get('/list')
    async list(
        @Paginate() queryPaginate: PaginateQuery,
        @Query() queryParams: QueryParamsUserDto,
    ) {
        const users = await this.usersService.list(queryPaginate, queryParams);
        const response = new GeneralResponse<Paginated<User>>().toObject(
            HttpStatus.OK,
            'List users',
            users,
        );
        return response;
    }

    @Get('/show/:id')
    async findOne(@Param('id') id: string) {
        let user = await this.usersService.findOne(+id);
        if (user == null) {
            throw new NotFoundException('No se ha encontrado el usuario');
        }
        let showUser = this.mapper.toShow(user);
        let response = new GeneralResponse<ShowUserDto>().toObject(
            HttpStatus.FOUND,
            'User found',
            showUser,
        );
        return response;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const user = await this.usersService.update(+id, updateUserDto);
        let showUser = this.mapper.toShow(user);
        let response = new GeneralResponse<ShowUserDto>().toObject(
            HttpStatus.OK,
            'User updated',
            showUser,
        );
        return response;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const deleted = await this.usersService.remove(+id);
        let response = new GeneralResponse<ShowUserDto>().toObject(
            HttpStatus.OK,
            'User delete',
            new ShowUserDto(),
        );
        return response;
    }
}
