import { plainToInstance } from 'class-transformer';

import { MapperResource } from '@global/dto/mapper-resource';
import { CapabilityRole } from '../entities/capability-role.entity';
import { ShowCapabilityRoleDto } from './show-capability-role.dto';
import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';

@Injectable()
export class MapperCapabilityRole implements MapperResource {
    toShow(data: CapabilityRole): ShowCapabilityRoleDto {
        return plainToInstance(ShowCapabilityRoleDto, data);
    }

    toShowArray(data: CapabilityRole[]): ShowCapabilityRoleDto[] {
        return data.map((d) => this.toShow(d));
    }

    toShowPaginated(data: Paginated<CapabilityRole>): Paginated<any> {
        const list = this.toShowArray(data.data);
        const present = {
            ...data,
            data: list,
        };
        return present;
    }
}
