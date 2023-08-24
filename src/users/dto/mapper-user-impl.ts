import { Injectable } from '@nestjs/common';
import { User } from '@users/entities/user.entity';
import { CreateUserDto } from './create-user.dto';
import { MapperUser } from './mapper-user';
import { ShowUserDto } from './show-user.dto';

@Injectable()
export class MapperUserImpl implements MapperUser {
    toShow(user: User): ShowUserDto {
        let show = new ShowUserDto();
        show.Id = user.id;
        show.Firstname = user.firstname;
        show.Lastname = user.lastname;
        show.Email = user.email;
        show.Phone = user.phone;
        show.Status = user.status;
        show.CreatedAt = user.createdAt;
        show.UpdatedAt = user.updatedAt;
        show.DeletedAt = user.deleteAt;
        return show;
    }

    fromCreate(create: CreateUserDto): User {
        const user = new User();
        user.firstname = create.firstname;
        user.lastname = create.lastname;
        user.phone = create.phone;
        user.email = create.email;
        return user;
    }

    toShowArray(users: User[]): ShowUserDto[] {
        let present = users.map((user) => {
            return this.toShow(user);
        });
        return present;
    }
}
