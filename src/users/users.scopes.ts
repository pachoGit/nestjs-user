import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './entities/user.entity';
import { QueryParamsUserDto } from './dto/query-param-user.dto';

export class UsersScopes {
    public static actives(
        query: SelectQueryBuilder<User>,
    ): SelectQueryBuilder<User> {
        return query.andWhere('users.status = :status', { status: 1 });
    }

    public static byColumn(
        query: SelectQueryBuilder<User>,
        column: string,
        search: string,
    ): SelectQueryBuilder<User> {
        let sql = 'users.' + column + ' = :search';
        return query.andWhere(sql, { search: search });
    }

    public static byIds(
        query: SelectQueryBuilder<User>,
        ids: number[],
    ): SelectQueryBuilder<User> {
        return query.whereInIds([...ids]);
    }

    public static search(
        query: SelectQueryBuilder<User>,
        search: string,
    ): SelectQueryBuilder<User> {
        return query
            .andWhere('users.firstname like :search', {
                search: `%${search}%`,
            })
            .andWhere('users.lastname like :search', {
                search: `%${search}%`,
            })
            .andWhere('users.email like :search', {
                search: `%${search}%`,
            })
            .andWhere('users.phone like :search', {
                search: `%${search}%`,
            });
    }

    public static filter(
        repository: Repository<User>,
        params: QueryParamsUserDto,
    ): SelectQueryBuilder<User> {
        let query = repository.createQueryBuilder('users');
        if (params.firstname) {
            query = this.byColumn(query, 'firstname', params.firstname);
        }
        if (params.lastname) {
            query = this.byColumn(query, 'lastname', params.lastname);
        }
        if (params.phone) {
            query = this.byColumn(query, 'phone', params.phone);
        }
        if (params.email) {
            query = this.byColumn(query, 'email', params.email);
        }
        if (params.id) {
            query = this.byIds(query, params.id);
        }
        if (params.search) {
            query = this.search(query, params.search);
        }
        query = query.leftJoinAndMapMany('users.roles', 'users.roles', 'roles');
        return query;
    }
}
