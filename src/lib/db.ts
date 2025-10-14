// Prisma was generated to `src/generated/prisma` (see prisma/schema.prisma generator output)
// Import directly from the generated client to avoid runtime resolution issues.
import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
