import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function createAdmin() {
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@vms.com",
    },
  });

  if (existingAdmin) {
    throw new Error("Admin already exists");
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  return await prisma.user.create({
    data: {
      name: "System Administrator",
      email: "admin@vms.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
}

export async function login(email: string, password: string) {
      const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: (user as any).role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: (user as any).role,
    },
  };
}

