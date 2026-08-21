import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function createMember(data: {
  name: string;
  email?: string;
  role: string;
  departmentId: string;
}) {
  return await prisma.departmentMember.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      departmentId: data.departmentId,
    },
  });
}

export async function getMembersByDepartment(departmentId: string) {
  return await prisma.departmentMember.findMany({
    where: { departmentId },
    orderBy: { name: "asc" },
  });
}

export async function getAllMembers() {
  return await prisma.departmentMember.findMany({
    include: {
      department: {
        select: { name: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function updateMember(
  id: string,
  data: { name?: string; email?: string; role?: string }
) {
  const member = await prisma.departmentMember.findUnique({ where: { id } });
  if (!member) throw new Error("Department member not found");

  return await prisma.departmentMember.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
    },
  });
}

export async function deleteMember(id: string) {
  const member = await prisma.departmentMember.findUnique({ where: { id } });
  if (!member) throw new Error("Department member not found");

  return await prisma.departmentMember.delete({ where: { id } });
}