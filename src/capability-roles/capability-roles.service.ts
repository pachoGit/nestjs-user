import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateCapabilityRoleDto } from './dto/create-capability-role.dto';
import { UpdateCapabilityRoleDto } from './dto/update-capability-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CapabilityRole } from './entities/capability-role.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Paginate, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { QueryParamsCapabilityRoleDto } from './dto/query-params-capability-role.dto';
import { CapabilityRolesScopes } from './capability-roles.scopes';
import { ChangeStatusCapabilityRoleDto } from './dto/change-status-capability-role.dto';

@Injectable()
export class CapabilityRolesService {
    constructor(
        @InjectRepository(CapabilityRole)
        private readonly roleRepository: Repository<CapabilityRole>,
    ) {}

    create(
        createCapabilityRoleDto: CreateCapabilityRoleDto,
    ): Promise<CapabilityRole> {
        const role = this.roleRepository.create(createCapabilityRoleDto);
        return this.roleRepository.save(role);
    }

    list(
        @Paginate() queryPaginate: PaginateQuery,
        @Query() queryParams: QueryParamsCapabilityRoleDto,
    ): Promise<Paginated<CapabilityRole>> {
        const filter = CapabilityRolesScopes.filter(
            this.roleRepository,
            queryParams,
        ).withDeleted();
        return paginate(queryPaginate, filter, {
            sortableColumns: ['id'],
        });
    }

    getAll(
        @Query() queryParams: QueryParamsCapabilityRoleDto,
    ): Promise<CapabilityRole[]> {
        const filter = CapabilityRolesScopes.filter(
            this.roleRepository,
            queryParams,
        ).withDeleted();
        return filter.getMany();
    }

    findOne(id: number): Promise<CapabilityRole | null> {
        return this.roleRepository.findOneBy({ id: id });
    }

    async changeStatus(
        id: number,
        changeStatusDto: ChangeStatusCapabilityRoleDto,
    ): Promise<CapabilityRole> {
        const role = await this.roleRepository.findOneBy({ id: id });
        if (role == null) {
            throw new NotFoundException('No se ha encontrado el rol');
        }
        const update = this.roleRepository.merge(role, changeStatusDto);
        return this.roleRepository.save(update);
    }

    async update(
        id: number,
        updateCapabilityRoleDto: UpdateCapabilityRoleDto,
    ): Promise<CapabilityRole> {
        const role = await this.roleRepository.findOneBy({ id: id });
        if (role == null) {
            throw new NotFoundException('No se ha encontrado el rol');
        }
        const update = this.roleRepository.merge(role, updateCapabilityRoleDto);
        return this.roleRepository.save(update);
    }

    remove(id: number): Promise<DeleteResult> {
        const query = this.roleRepository.createQueryBuilder('roles');
        query.softDelete().where('id = :id', { id: id }).execute();
        return query
            .update()
            .set({ status: 0 })
            .where('id = :id', { id: id })
            .execute();
    }
}
