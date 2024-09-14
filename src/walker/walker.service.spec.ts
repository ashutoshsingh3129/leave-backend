import { Test, TestingModule } from '@nestjs/testing';
import { WalkerService } from './walker.service';

describe('WalkerService', () => {
  let service: WalkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalkerService],
    }).compile();

    service = module.get<WalkerService>(WalkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
