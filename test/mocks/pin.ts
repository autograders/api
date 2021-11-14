import { Pin } from '@prisma/client';
import faker from 'faker';

import { PinConfig } from '@configs/pin';

export const mockPin = (): Pin => ({
  key: faker.datatype.uuid(),
  code: faker.datatype.uuid(),
  expiresIn: BigInt(Date.now() + PinConfig.maxAge),
  userId: faker.datatype.uuid()
});
