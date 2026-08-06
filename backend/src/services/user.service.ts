import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function createReceptionist(
  name: string,
  email: string,
  password: string
) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "RECEPTIONIST",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function getAllReceptionists() {
  return await prisma.user.findMany({
    where: { role: "RECEPTIONIST" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function updateReceptionist(
  id: string,
  data: { name?: string; email?: string }
) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user || user.role !== "RECEPTIONIST") {
    throw new Error("Receptionist not found");
  }

  return await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function deleteReceptionist(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user || user.role !== "RECEPTIONIST") {
    throw new Error("Receptionist not found");
  }

  return await prisma.user.delete({ where: { id } });
}