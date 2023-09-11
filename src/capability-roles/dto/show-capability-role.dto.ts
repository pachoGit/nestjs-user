import { Expose } from 'class-transformer';

export class ShowCapabilityRoleDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose({ name: 'createdAt' })
    created_at: Date;

    @Expose({ name: 'updatedAt' })
    updated_at: Date;

    @Expose({ name: 'deletedAt' })
    deleted_at: Date | null;

    constructor() {}
}
