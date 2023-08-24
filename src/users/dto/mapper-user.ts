import { User } from '@users/entities/user.entity';
import { CreateUserDto } from './create-user.dto';
import { ShowUserDto } from './show-user.dto';

export interface MapperUser {
    toShow(user: User): ShowUserDto;

    fromCreate(create: CreateUserDto): User;

    toShowArray(users: User[]): ShowUserDto[];
}
