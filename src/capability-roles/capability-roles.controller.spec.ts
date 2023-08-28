import { Test, TestingModule } from '@nestjs/testing';
import { CapabilityRolesController } from './capability-roles.controller';
import { CapabilityRolesService } from './capability-roles.service';

describe('CapabilityRolesController', () => {
  let controller: CapabilityRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapabilityRolesController],
      providers: [CapabilityRolesService],
    }).compile();

    controller = module.get<CapabilityRolesController>(CapabilityRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
