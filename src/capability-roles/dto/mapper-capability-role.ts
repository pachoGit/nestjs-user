import { MapperResource } from '@global/dto/mapper-resource';
import { CapabilityRole } from '../entities/capability-role.entity';
import { ShowCapabilityRoleDto } from './show-capability-role.dto';
import { CreateCapabilityRoleDto } from './create-capability-role.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperCapabilityRole implements MapperResource {
    toShow(data: CapabilityRole): ShowCapabilityRoleDto {
        const show = new ShowCapabilityRoleDto();
        show.Id = data.id;
        show.Name = data.name;
        show.Description = data.description;
        show.CreatedAt = data.createdAt;
        show.UpdatedAt = data.updatedAt;
        show.DeletedAt = data.deletedAt;
        return show;
    }

    fromCreate(data: CreateCapabilityRoleDto): CapabilityRole {
        const role = new CapabilityRole();
        role.name = data.name;
        role.description = data.description;
        return role;
    }

    toShowArray(data: CapabilityRole[]): ShowCapabilityRoleDto[] {
        const present = data.map((role) => {
            return this.toShow(role);
        });
        return present;
    }
}
