import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    db: {
      adapter: "postgresql",
      url: process.env.DATABASE_URL!,  // make sure .env has DATABASE_URL
    },
  },
});
