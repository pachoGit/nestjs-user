import { PartialType } from '@nestjs/mapped-types';
import { CreateCapabilityRoleDto } from './create-capability-role.dto';

export class UpdateCapabilityRoleDto extends PartialType(CreateCapabilityRoleDto) {}
