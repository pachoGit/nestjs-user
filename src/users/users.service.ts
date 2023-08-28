import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsUserDto } from './dto/query-param-user.dto';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginate, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { UsersScopes } from './users.scopes';
import { ChangeStatusUserDto } from './dto/change-status-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    list(
        @Paginate() queryPaginate: PaginateQuery,
        @Query() queryParams: QueryParamsUserDto,
    ): Promise<Paginated<User>> {
        const filter = UsersScopes.filter(
            this.userRepository,
            queryParams,
        ).withDeleted();
        return paginate(queryPaginate, filter, {
            sortableColumns: ['id'],
        });
    }

    getAll(@Query() queryParams: QueryParamsUserDto): Promise<User[]> {
        const filter = UsersScopes.filter(
            this.userRepository,
            queryParams,
        ).withDeleted();
        return filter.getMany();
    }

    findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({
            withDeleted: true,
            where: { id: id },
        });
    }

    async changeStatus(
        id: number,
        changeStatusDto: ChangeStatusUserDto,
    ): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id });
        if (user == null) {
            throw new NotFoundException('No se ha encontrado el usuario');
        }
        const update = this.userRepository.merge(user, changeStatusDto);
        return this.userRepository.save(update);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id });
        if (user == null) {
            throw new NotFoundException('No se ha encontrado el usuario');
        }
        const update = this.userRepository.merge(user, updateUserDto);
        return this.userRepository.save(update);
    }

    async remove(id: number): Promise<DeleteResult> {
        const query = this.userRepository.createQueryBuilder('users');
        query.softDelete().where('id = :id', { id: id }).execute();
        return query
            .update()
            .set({ status: 0 })
            .where('id = :id', { id: id })
            .execute();
    }
}
