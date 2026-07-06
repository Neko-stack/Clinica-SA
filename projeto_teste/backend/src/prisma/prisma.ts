import { PrismaClient } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString =
    process.env.DATABASE_URL ??
    "postgresql://postgres:senai@localhost:5432/clinic?schema=public";

const isPgConnection =
    connectionString.startsWith("postgresql://") ||
    connectionString.startsWith("postgres://");

const prismaOptions = isPgConnection
    ? { adapter: new PrismaPg({ connectionString }), log: ["query"] }
    : { log: ["query"] };

export const prisma = new PrismaClient(prismaOptions as ConstructorParameters<typeof PrismaClient>[0]);
