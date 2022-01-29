const { PrismaClient } = require('@prisma/client');
const { hash } = require('argon2');

const prisma = new PrismaClient();

async function seed() {
  try {
    prisma.$connect();

    await prisma.user.upsert({
      where: {
        email: 'andres.cv@galileo.edu'
      },
      update: {
        isVerified: true,
        isDeactivated: false,
        isInstructor: false,
        password: await hash('Guitarhero318$')
      },
      create: {
        email: 'andres.cv@galileo.edu',
        firstName: 'Andrés',
        lastName: 'Castellanos',
        password: await hash('AG2021$'),
        isVerified: true,
        isDeactivated: false,
        isInstructor: false
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
}

seed();
