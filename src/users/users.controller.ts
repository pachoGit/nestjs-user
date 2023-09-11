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
    ConsoleLogger,
} from '@nestjs/common';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

import { GeneralResponse } from '@global/dto/response';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MapperUser } from './dto/mapper-user';
import { ShowUserDto } from './dto/show-user.dto';
import { QueryParamsUserDto } from './dto/query-param-user.dto';
import { ChangeStatusUserDto } from './dto/change-status-user.dto';

@Controller('users')
export class UsersController {
    private logger: ConsoleLogger = new ConsoleLogger();

    constructor(
        private readonly usersService: UsersService,
        private readonly mapper: MapperUser,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        const showUser = this.mapper.toShow(user);
        const response = new GeneralResponse<ShowUserDto>().toObject(
            HttpStatus.CREATED,
            'User created',
            showUser,
        );
        return response;
    }

    @Get('/get')
    async getAll(@Query() queryParams: QueryParamsUserDto) {
        const users = await this.usersService.getAll(queryParams);
        const showUsers = this.mapper.toShowArray(users);
        const response = new GeneralResponse<ShowUserDto>().toArray(
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
        const paginatedUsers = await this.usersService.list(
            queryPaginate,
            queryParams,
        );
        const showUsers = this.mapper.toShowPaginated(paginatedUsers);
        const response = new GeneralResponse<Paginated<ShowUserDto>>().toObject(
            HttpStatus.OK,
            'List users',
            showUsers,
        );
        return response;
    }

    @Get('/show/:id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(+id);
        if (user == null) {
            throw new NotFoundException('No se ha encontrado el usuario');
        }
        const showUser = this.mapper.toShow(user);
        const response = new GeneralResponse<ShowUserDto>().toObject(
            HttpStatus.FOUND,
            'User found',
            showUser,
        );
        return response;
    }

    @Patch(':id')
    async changeStatus(
        @Param('id') id: string,
        @Body() changeStatusDto: ChangeStatusUserDto,
    ) {
        const user = await this.usersService.changeStatus(+id, changeStatusDto);
        const showUser = this.mapper.toShow(user);
        const response = new GeneralResponse<ShowUserDto>().toObject(
            HttpStatus.OK,
            'User updated',
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
        const showUser = this.mapper.toShow(user);
        const response = new GeneralResponse<ShowUserDto>().toObject(
            HttpStatus.OK,
            'User updated',
            showUser,
        );
        return response;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const deleted = await this.usersService.remove(+id);
        const response = new GeneralResponse<ShowUserDto>().toObject(
            HttpStatus.OK,
            'User delete',
            new ShowUserDto(),
        );
        return response;
    }
}
