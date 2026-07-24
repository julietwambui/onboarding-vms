import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: "admin@vms.com" },
  });

  if (!existing) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
      data: {
        name: "System Administrator",
        email: "admin@vms.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("✅ Admin created successfully.");
  } else {
    console.log("ℹ️ Admin already exists.");
  }
}

main()
  .catch(console.error)
  .finally(async () => await pool.end());