import "dotenv/config";
import { defineConfig } from "@prisma/config"; // Aproveite para garantir o @ aqui

export default defineConfig({
  schema: "prisma/schema.prisma", // Removido o 'src/' duplicado
  migrations: {
    path: "prisma/migrations",    // Removido o 'src/' duplicado
  },
  datasource: {
    url: 'postgresql://postgres:senai@localhost:5432/clinic?schema=public',
  },
});