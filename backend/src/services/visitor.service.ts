import { PrismaClient } from "../../generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import{Pool} from "pg";

const pool=new Pool({
  connectionString:process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

export async function findAll(search?: string) {
  return await prisma.visitor.findMany({
    where: search ? {
      fullName: {
        contains: search,
        mode: "insensitive",
      },
    } : undefined,
    orderBy: {
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
  const visitor=await prisma.visitor.findUnique({
    where:{id},
  });
  if(!visitor){
    throw new Error("Visitor not found");
  }
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
  const visitor=await prisma.visitor.findUnique({
    where:{id},
  });
  if(!visitor){
    throw new Error("Visitor not found");
  }
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
