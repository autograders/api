import { Test } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { mockDeep, mockReset } from 'jest-mock-extended';

import { mockPin } from '@mocks/pin';
import { mockUser } from '@mocks/user';
import { PinService } from '@services/pin';
import { PrismaService } from '@services/prisma';

describe('PinService tests', () => {
  let service: PinService;
  const prisma = mockDeep<PrismaService>();
  const mailer = mockDeep<MailerService>();

  beforeEach(async () => {
    mockReset(prisma);
    mockReset(mailer);

    const module = await Test.createTestingModule({
      providers: [MailerService, PrismaService, PinService]
    })
      .overrideProvider(MailerService)
      .useValue(mailer)
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    service = module.get<PinService>(PinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a new pin', async () => {
    const mockedUser = mockUser();
    const mockedPin = mockPin();

    prisma.user.findUnique.mockResolvedValueOnce(mockedUser);
    prisma.pin.upsert.mockResolvedValueOnce(mockedPin);

    const pin = await service.generate({ email: mockedUser.email });

    expect(pin).toEqual(mockedPin);
  });

  it('should throw user does not exist (generate new pin)', async () => {
    await expect(
      service.generate({
        email: 'test@gmail.com'
      })
    ).rejects.toThrowError();
  });

  it('should throw user is deactivated (generate new pin)', async () => {
    const mockedUser = mockUser();
    mockedUser.isDeactivated = true;

    prisma.user.findUnique.mockResolvedValueOnce(mockedUser);

    await expect(
      service.generate({
        email: mockedUser.email
      })
    ).rejects.toThrowError();
  });

  it('should verify pin', async () => {
    const mockedPin = mockPin();
    const mockedUser = mockUser();
    const mockedResult = { ...mockedPin, user: mockedUser };

    prisma.pin.findFirst.mockResolvedValueOnce(mockedResult);

    const user = await service.verify({
      key: mockedPin.key,
      code: mockedPin.code
    });

    expect(user).toEqual(mockedUser);
  });

  it('should throw invalid or expired pin (verify pin)', async () => {
    await expect(
      service.verify({
        key: 'key',
        code: 'value'
      })
    ).rejects.toThrowError();
  });

  it('should remove expired pins', async () => {
    await expect(service.removeExpiredPins()).resolves.toBeUndefined();
  });
});
