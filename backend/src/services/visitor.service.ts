import { PrismaClient } from "../../generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import{Pool} from "pg";

const pool=new Pool({
  connectionString:process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

export async function findAll() {
  return await prisma.visitor.findMany({
    orderBy:{
      createdAt:"desc",
    },
  });
}

export async function create(data: { fullName: string; purpose: string }) {
  return await prisma.visitor.create({
    data:{
      fullName:data.fullName,
      purpose:data.purpose,
      status:"PENDING",
    },
  });
}

export async function checkIn(id: string) {
  return await prisma.visitor.update({
    where:{
      id,
    },
    data:{
      status:"CHECKED_IN",
      timeIn:new Date(),
    },
  });
}

export async function checkOut(id: string) {
  return await prisma.visitor.update({
    where:{
      id,
    },
    data:{
      status:"CHECKED_OUT",
      timeOut:new Date(),
    },
  });
}
