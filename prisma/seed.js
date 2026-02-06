const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // 1. Hash the password
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  // 2. Create or update the admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@jobportal.com" },   // fixed email
    update: {},                                // no updates allowed
    create: {
      email: "admin@jobportal.com",
      password: await bcrypt.hash("Admin@123", 10),
      role: "ADMIN",   // must match your role.middleware
    },
  });

  console.log("Admin account created:", admin);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
