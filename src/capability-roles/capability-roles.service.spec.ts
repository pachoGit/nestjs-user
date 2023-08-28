import { Test, TestingModule } from '@nestjs/testing';
import { CapabilityRolesService } from './capability-roles.service';

describe('CapabilityRolesService', () => {
  let service: CapabilityRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapabilityRolesService],
    }).compile();

    service = module.get<CapabilityRolesService>(CapabilityRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
