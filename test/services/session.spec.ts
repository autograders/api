import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { mockDeep, mockReset } from 'jest-mock-extended';

import { JWTConfig } from '@configs/jwt';
import { GQLContext } from '@interfaces/gql';
import { mockUser } from '@mocks/user';
import { SessionService } from '@services/session';

describe('SessionService tests', () => {
  let service: SessionService;
  const jwt = mockDeep<JwtService>();
  const ctx = mockDeep<GQLContext>();

  beforeEach(async () => {
    mockReset(jwt);
    mockReset(ctx);

    const module = await Test.createTestingModule({
      imports: [JwtModule.register(JWTConfig)],
      providers: [SessionService, JwtService]
    })
      .overrideProvider(JwtService)
      .useValue(jwt)
      .compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should refresh session', async () => {
    const mockedUser = mockUser();
    jwt.signAsync.mockResolvedValue('token');
    const result = await service.refresh(mockedUser, ctx);

    expect(result).toEqual('token');
  });
});
