import { User } from '@prisma/client';
import faker from 'faker';

export const mockUser = (): User => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.internet.avatar(),
  authKey: faker.datatype.uuid(),
  isVerified: true,
  isDeactivated: false,
  isInstructor: false,
  createdAt: faker.datatype.datetime(),
  updatedAt: faker.datatype.datetime()
});
