import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapabilityRolesService } from './capability-roles.service';
import { CapabilityRolesController } from './capability-roles.controller';
import { CapabilityRole } from './entities/capability-role.entity';
import { MapperCapabilityRole } from './dto/mapper-capability-role';

@Module({
    imports: [TypeOrmModule.forFeature([CapabilityRole])],
    controllers: [CapabilityRolesController],
    providers: [CapabilityRolesService, MapperCapabilityRole],
})
export class CapabilityRolesModule {}
