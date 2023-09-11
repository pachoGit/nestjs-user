import { ShowCapabilityRoleDto } from '@capability/roles/dto/show-capability-role.dto';
import { Expose, Type } from 'class-transformer';

export class ShowUserDto {
    @Expose()
    id: number;

    @Expose()
    firstname: string;

    @Expose()
    lastname: string;

    @Expose()
    email: string;

    @Expose()
    phone: string;

    @Expose()
    status: number;

    @Expose({ name: 'createdAt' })
    created_at: Date;

    @Expose({ name: 'updatedAt' })
    updated_at: Date;

    @Expose({ name: 'deletedAt' })
    deleted_at: Date | null;

    @Expose({ name: 'roles' })
    @Type(() => ShowCapabilityRoleDto)
    capability_roles: ShowCapabilityRoleDto[];

    constructor() {}
}
