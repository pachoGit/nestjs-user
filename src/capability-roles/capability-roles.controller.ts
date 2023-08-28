import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpStatus,
    Query,
    NotFoundException,
    Put,
    Patch,
} from '@nestjs/common';
import { CapabilityRolesService } from './capability-roles.service';
import { CreateCapabilityRoleDto } from './dto/create-capability-role.dto';
import { UpdateCapabilityRoleDto } from './dto/update-capability-role.dto';
import { GeneralResponse } from '@app/global/dto/response';
import { CapabilityRole } from './entities/capability-role.entity';
import { QueryParamsCapabilityRoleDto } from './dto/query-params-capability-role.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { ChangeStatusCapabilityRoleDto } from './dto/change-status-capability-role.dto';

@Controller('capability/roles')
export class CapabilityRolesController {
    constructor(
        private readonly capabilityRolesService: CapabilityRolesService,
    ) {}

    @Post()
    async create(@Body() createCapabilityRoleDto: CreateCapabilityRoleDto) {
        const role = await this.capabilityRolesService.create(
            createCapabilityRoleDto,
        );
        const response = new GeneralResponse<CapabilityRole>().toObject(
            HttpStatus.CREATED,
            'Capability role created',
            role,
        );
        return response;
    }

    @Get('/get')
    async getAll(@Query() queryParams: QueryParamsCapabilityRoleDto) {
        const roles = await this.capabilityRolesService.getAll(queryParams);
        const response = new GeneralResponse<CapabilityRole>().toArray(
            HttpStatus.OK,
            'List capability roles',
            roles,
        );
        return response;
    }

    @Get('/list')
    async list(
        @Paginate() queryPaginate: PaginateQuery,
        @Query() queryParams: QueryParamsCapabilityRoleDto,
    ) {
        const roles = await this.capabilityRolesService.list(
            queryPaginate,
            queryParams,
        );
        const response = new GeneralResponse<
            Paginated<CapabilityRole>
        >().toObject(HttpStatus.OK, 'List capability roles', roles);
        return response;
    }

    @Get('/show/:id')
    async findOne(@Param('id') id: string) {
        const role = await this.capabilityRolesService.findOne(+id);
        if (role == null) {
            throw new NotFoundException('No se ha encontrado el rol');
        }
        const response = new GeneralResponse<CapabilityRole>().toObject(
            HttpStatus.FOUND,
            'Capability role found',
            role,
        );
        return response;
    }

    @Patch(':id')
    async changeStatus(
        @Param('id') id: string,
        @Body() changeStatusDto: ChangeStatusCapabilityRoleDto,
    ) {
        const role = await this.capabilityRolesService.changeStatus(
            +id,
            changeStatusDto,
        );
        const response = new GeneralResponse<CapabilityRole>().toObject(
            HttpStatus.FOUND,
            'Capability role updated',
            role,
        );
        return response;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCapabilityRoleDto: UpdateCapabilityRoleDto,
    ) {
        const role = await this.capabilityRolesService.update(
            +id,
            updateCapabilityRoleDto,
        );
        const response = new GeneralResponse<CapabilityRole>().toObject(
            HttpStatus.OK,
            'Capability role updated',
            role,
        );
        return response;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const deleted = await this.capabilityRolesService.remove(+id);
        const response = new GeneralResponse<CapabilityRole>().toObject(
            HttpStatus.OK,
            'Capability role deleted',
            {} as CapabilityRole,
        );
        return response;
    }
}
