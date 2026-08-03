import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export async function findAllDepartments() {
  return await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function createDepartment(data: { name: string }) {
  return await prisma.department.create({
    data: {
      name: data.name,
    },
  });
}

export async function updateDepartment(
  id: string,
  data: { name: string }
) {
  return await prisma.department.update({
    where: {
      id,
    },
    data: {
      name: data.name,
    },
  });
}

export async function deleteDepartment(id: string) {
  return await prisma.department.delete({
    where: {
      id,
    },
  });
}