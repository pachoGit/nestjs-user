import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';

export const database: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'user-nest',
    entities: [User],
    synchronize: true,
};
