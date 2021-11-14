import { Test } from '@nestjs/testing';
import { mockDeep, mockReset } from 'jest-mock-extended';

import { mockPin } from '@mocks/pin';
import { mockUser } from '@mocks/user';
import { AuthService } from '@services/auth';
import { CryptoService } from '@services/crypto';
import { PinService } from '@services/pin';
import { PrismaService } from '@services/prisma';

describe('AuthService tests', () => {
  let service: AuthService;
  const crypto = mockDeep<CryptoService>();
  const prisma = mockDeep<PrismaService>();
  const pin = mockDeep<PinService>();

  beforeEach(async () => {
    mockReset(crypto);
    mockReset(prisma);
    mockReset(pin);

    const module = await Test.createTestingModule({
      providers: [CryptoService, PinService, PrismaService, AuthService]
    })
      .overrideProvider(CryptoService)
      .useValue(crypto)
      .overrideProvider(PinService)
      .useValue(pin)
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign up', async () => {
    const mockedUser = mockUser();
    const mockedPin = mockPin();

    prisma.user.upsert.mockResolvedValueOnce(mockedUser);
    pin.generate.mockResolvedValueOnce(mockedPin);

    const result = await service.signUp({
      firstName: mockedUser.firstName,
      lastName: mockedUser.lastName,
      email: mockedUser.email,
      password: mockedUser.password
    });

    expect(result.pin).toEqual(mockedPin);
    expect(result.newUser).toEqual(mockedUser);
  });

  it('should throw user already exist (sign up)', async () => {
    const mockedUser = mockUser();
    mockedUser.isVerified = true;

    prisma.user.findUnique.mockResolvedValueOnce(mockedUser);

    await expect(
      service.signUp({
        firstName: mockedUser.firstName,
        lastName: mockedUser.lastName,
        email: mockedUser.email,
        password: mockedUser.password
      })
    ).rejects.toThrowError();
  });

  it('should verify email', async () => {
    const mockedPin = mockPin();
    const mockedUser = mockUser();

    pin.verify.mockResolvedValueOnce(mockedUser);
    prisma.user.update.mockResolvedValueOnce(mockedUser);

    const user = await service.verifyEmail({
      key: mockedPin.key,
      code: mockedPin.code
    });

    expect(user).toEqual(mockedUser);
  });

  it('should sign in', async () => {
    const mockedUser = mockUser();

    prisma.user.findUnique.mockResolvedValueOnce(mockedUser);
    crypto.check.mockResolvedValueOnce(true);

    const user = await service.signIn({
      email: mockedUser.email,
      password: mockedUser.password
    });

    expect(user).toEqual(mockedUser);
  });

  it('should throw user does not exist (sign in)', async () => {
    await expect(
      service.signIn({
        email: 'fake@gmail.com',
        password: 'Ag2021$1'
      })
    ).rejects.toThrowError();
  });

  it('should throw user email is not verified (sign in)', async () => {
    const mockedUser = mockUser();
    mockedUser.isVerified = false;

    prisma.user.findUnique.mockResolvedValueOnce(mockedUser);

    await expect(
      service.signIn({
        email: mockedUser.email,
        password: mockedUser.password
      })
    ).rejects.toThrowError();
  });

  it('should throw user is deactivated (sign in)', async () => {
    const mockedUser = mockUser();
    mockedUser.isDeactivated = true;

    prisma.user.findUnique.mockResolvedValueOnce(mockedUser);

    await expect(
      service.signIn({
        email: mockedUser.email,
        password: mockedUser.password
      })
    ).rejects.toThrowError();
  });

  it('should throw wrong credentials (sign in)', async () => {
    const mockedUser = mockUser();

    prisma.user.findUnique.mockResolvedValueOnce(mockedUser);
    crypto.check.mockResolvedValueOnce(false);

    await expect(
      service.signIn({
        email: mockedUser.email,
        password: mockedUser.password
      })
    ).rejects.toThrowError();
  });

  it('should sign out', async () => {
    const mockedUser = mockUser();

    const result = await service.signOut(mockedUser, {});

    expect(result).toBeUndefined();
  });

  it('should sign out (all devices)', async () => {
    const mockedUser = mockUser();

    const result = await service.signOut(mockedUser, {
      allDevices: true
    });

    expect(result).toBeUndefined();
  });

  it('should reset password', async () => {
    const mockedUser = mockUser();
    const mockedPin = mockPin();

    pin.verify.mockResolvedValueOnce(mockedUser);
    prisma.user.update.mockResolvedValueOnce(mockedUser);

    const user = await service.resetPassword({
      key: mockedPin.key,
      code: mockedPin.code,
      newPassword: 'newPassword'
    });

    expect(user).toEqual(mockedUser);
  });
});
