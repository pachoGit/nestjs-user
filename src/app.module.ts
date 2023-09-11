import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from './database.config';
import { UsersModule } from './users/users.module';
import { CapabilityRolesModule } from './capability-roles/capability-roles.module';
import { ExistsConstraint } from '@global/validators/exists';
import { ExistsInConstraint } from '@global/validators/exists-in';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                'config/${process.env.NODE_ENV}.env',
                'config/local.env',
            ],
        }),
        TypeOrmModule.forRoot(database),
        UsersModule,
        CapabilityRolesModule,
    ],
    controllers: [AppController],
    providers: [AppService, ExistsConstraint, ExistsInConstraint],
})
export class AppModule {}
