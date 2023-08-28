import { Repository, SelectQueryBuilder } from 'typeorm';
import { CapabilityRole } from './entities/capability-role.entity';
import { QueryParamsCapabilityRoleDto } from './dto/query-params-capability-role.dto';

export class CapabilityRolesScopes {
    public static actives(
        query: SelectQueryBuilder<CapabilityRole>,
    ): SelectQueryBuilder<CapabilityRole> {
        return query.andWhere('roles.status = :status', { status: 1 });
    }

    public static byColumn(
        query: SelectQueryBuilder<CapabilityRole>,
        column: string,
        search: string,
    ): SelectQueryBuilder<CapabilityRole> {
        let sql = 'users.' + column + ' = :search';
        return query.andWhere(sql, { search: search });
    }

    public static byIds(
        query: SelectQueryBuilder<CapabilityRole>,
        ids: number[],
    ): SelectQueryBuilder<CapabilityRole> {
        return query.whereInIds([...ids]);
    }

    public static search(
        query: SelectQueryBuilder<CapabilityRole>,
        search: string,
    ): SelectQueryBuilder<CapabilityRole> {
        return query
            .andWhere('roles.name like :search', {
                search: `%${search}%`,
            })
            .andWhere('roles.description like :search', {
                search: `%${search}%`,
            });
    }

    public static filter(
        repository: Repository<CapabilityRole>,
        params: QueryParamsCapabilityRoleDto,
    ): SelectQueryBuilder<CapabilityRole> {
        let query = repository.createQueryBuilder('users');
        if (params.name) {
            query = this.byColumn(query, 'name', params.name);
        }
        if (params.description) {
            query = this.byColumn(query, 'description', params.description);
        }
        if (params.id) {
            query = this.byIds(query, params.id);
        }
        if (params.search) {
            query = this.search(query, params.search);
        }
        return query;
    }
}
