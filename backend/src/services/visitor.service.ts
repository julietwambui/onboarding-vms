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
    include: {
      department:{
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt:"desc",
    },
  });
}

export async function create(data: {
   fullName: string;
   email: string;
   phoneNumber: string;
   departmentId: string;
   purpose: string;

    
  }) {
  return await prisma.visitor.create({
    data:{
      fullName:data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      departmentId: data.departmentId,
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

async function getTodayVisitors() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  return prisma.visitor.count({
    where: {
      createdAt: {
        gte: startOfDay,
      },
    },
  });
}

async function getWeeklyVisitors() {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  startOfWeek.setHours(0, 0, 0, 0);

  return prisma.visitor.count({
    where: {
      createdAt: {
        gte: startOfWeek,
      },
    },
  });
}

async function getWeeklyVisitorTrend() {
  const today = new Date();
  const weeklyData = [];

  for (let i = 6; i >= 0; i--) {
    const start = new Date(today);
    start.setDate(today.getDate() - i);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    const count = await prisma.visitor.count({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    weeklyData.push({
      day: start.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      visitors: count,
    });
  }

  return weeklyData;
}

async function getDepartmentAnalytics() {
  const departmentStats = await prisma.visitor.groupBy({
    by: ["departmentId"],
    _count: {
      departmentId: true,
    },
    where: {
      departmentId: {
        not: null,
      },
    },
  });

  const result = await Promise.all(
    departmentStats.map(async (item) => {
      const department = await prisma.department.findUnique({
        where: {
          id: item.departmentId!,
        },
      });

      return {
        department: department?.name ?? "Unknown",
        visits: item._count.departmentId,
      };
    })
  );

  return result.sort((a, b) => b.visits - a.visits);
}

async function getPurposeAnalytics() {
  const purposes = await prisma.visitor.groupBy({
    by: ["purpose"],
    _count: {
      purpose: true,
    },
  });

  return purposes.map((item) => ({
    purpose: item.purpose,
    visits: item._count.purpose,
  }));
}

async function getMostVisitedDepartment() {
  const departmentVisits = await prisma.visitor.groupBy({
    by: ["departmentId"],
    _count: {
      departmentId: true,
    },
    where: {
      departmentId: {
        not: null,
      },
    },
    orderBy: {
      _count: {
        departmentId: "desc",
      },
    },
    take: 1,
  });

  if (
    departmentVisits.length === 0 ||
    !departmentVisits[0].departmentId
  ) {
    return "N/A";
  }

  const department = await prisma.department.findUnique({
    where: {
      id: departmentVisits[0].departmentId,
    },
  });

  return department?.name ?? "N/A";
}

async function getRepeatVisitors() {
  const visitors = await prisma.visitor.findMany({
    select: {
      fullName: true,
      departmentId: true,
      purpose: true,
    },
  });

  const visitCounts: Record<string, number> = {};

  for (const visitor of visitors) {
    const key = `${visitor.fullName}__${visitor.departmentId}__${visitor.purpose}`;

    visitCounts[key] = (visitCounts[key] || 0) + 1;
  }

  return Object.values(visitCounts).filter(
    (count) => count >= 5
  ).length;
}

async function getRecentActivity() {
  return prisma.visitor.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      fullName: true,
      status: true,
      createdAt: true,
      department: {
        select: {
          name: true,
        },
      },
    },
  });
}
export async function getOverviewStats() {
  return {
    todayVisitors: await getTodayVisitors(),
    weeklyVisitors: await getWeeklyVisitors(),
    mostVisitedDepartment: await getMostVisitedDepartment(),
    repeatVisitors: await getRepeatVisitors(),
    recentActivity: await getRecentActivity(),
  };
}

export async function getFrequentVisitors() {
  const allVisitors = await prisma.visitor.findMany({
    select: {
      fullName: true,
      departmentId: true,
      purpose: true,
      department: {
        select: {
          name: true,
        },
      },
    },
  });

  const visitMap: Record<
    string,
    {
      fullName: string;
      department: string;
      purpose: string;
      count: number;
    }
  > = {};

  for (const visitor of allVisitors) {
    const key = `${visitor.fullName}__${visitor.departmentId}__${visitor.purpose}`;

    if (!visitMap[key]) {
      visitMap[key] = {
        fullName: visitor.fullName,
        department: visitor.department?.name ?? "Unknown",
        purpose: visitor.purpose,
        count: 0,
      };
    }

    visitMap[key].count++;
  }

  return Object.values(visitMap)
    .filter((visitor) => visitor.count >= 5)
    .sort((a, b) => b.count - a.count);
}

export async function getWeeklyAnalytics() {
  return await getWeeklyVisitorTrend();
}

export async function getDepartmentStats() {
  return await getDepartmentAnalytics();
}

export async function getPurposeStats() {
  return await getPurposeAnalytics();
}

export async function updateVisitor(
  id: string,
  data: { fullName: string; purpose: string }
) {
  const visitor = await prisma.visitor.findUnique({ where: { id } });
  if (!visitor) throw new Error("Visitor not found");

  return await prisma.visitor.update({
    where: { id },
    data: {
      fullName: data.fullName,
      purpose: data.purpose,
    },
  });
}

export async function deleteVisitor(id: string) {
  const visitor = await prisma.visitor.findUnique({ where: { id } });
  if (!visitor) throw new Error("Visitor not found");

  return await prisma.visitor.delete({
    where: { id },
  });
}