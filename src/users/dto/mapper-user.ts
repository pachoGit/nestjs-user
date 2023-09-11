import { plainToInstance } from 'class-transformer';

import { MapperResource } from '@global/dto/mapper-resource';
import { User } from '@users/entities/user.entity';
import { ShowUserDto } from './show-user.dto';
import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';

import { MapperCapabilityRole } from '@capability/roles/dto/mapper-capability-role';

@Injectable()
export class MapperUser implements MapperResource {
    constructor(private mapperRole: MapperCapabilityRole) {}

    toShow(data: User): ShowUserDto {
        const present = plainToInstance(ShowUserDto, data);
        if (data.roles) {
            present.capability_roles = this.mapperRole.toShowArray(data.roles);
        }
        return present;
    }

    toShowArray(data: User[]): ShowUserDto[] {
        return data.map((d) => this.toShow(d));
    }

    toShowPaginated(data: Paginated<User>): Paginated<any> {
        const list = this.toShowArray(data.data);
        const present = {
            ...data,
            data: list,
        };
        return present;
    }
}
