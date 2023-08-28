import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { CapabilityRole } from '@capability/roles/entities/capability-role.entity';

// export class DatabaseConfig {
//     constructor(private configService: ConfigService) {}

//     getConfig(): TypeOrmModuleOptions {
//         let config = {
//             type: 'mysql',
//             host: this.configService.get<string>('DATABASE_HOST', 'localhost'),
//             port: this.configService.get<number>('DATABASE_PORT', 3306),
//             username: this.configService.get<string>('DATABASE_USER', 'pacho'),
//             password: this.configService.get<string>(
//                 'DATABASE_PASSWORD',
//                 'pacho',
//             ),
//             entities: [User],
//             synchronize: true,
//         };
//         console.log({ config });
//         return config as TypeOrmModuleOptions;
//     }
// }

export const database: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'user-nest',
    entities: [User, CapabilityRole],
    synchronize: true,
};
