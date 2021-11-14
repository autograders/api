import { Test } from '@nestjs/testing';

import { CryptoService } from '@services/crypto';

describe('CryptoService tests', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CryptoService]
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash raw text', async () => {
    const hash = await service.hash('test');

    expect(hash).toBeDefined();
  });

  it('should check hash', async () => {
    const hash = await service.hash('test');
    const valid = await service.check(hash, 'test');

    expect(valid).toBeTruthy();
  });
});
