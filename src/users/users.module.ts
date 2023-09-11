import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { MapperUser } from './dto/mapper-user';
import { MapperCapabilityRole } from '@capability/roles/dto/mapper-capability-role';
import { CapabilityRole } from '@capability/roles/entities/capability-role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, CapabilityRole])],
    controllers: [UsersController],
    providers: [UsersService, MapperUser, MapperCapabilityRole],
})
export class UsersModule {}
