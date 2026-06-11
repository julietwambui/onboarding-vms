// ⚠️  Before this import will work, you must run: npx prisma db push
//     That command generates the Prisma client into ../../generated/prisma
import { PrismaClient } from "../../generated/prisma";

// A single shared Prisma client instance — do NOT create a new one inside each function
const prisma = new PrismaClient();

/**
 * Retrieve all visitors from the database, newest first.
 */
export async function findAll() {
  // TODO: Use prisma.visitor.findMany() to return all visitors
  // Hint: orderBy createdAt descending
}

/**
 * Create a new visitor record with PENDING status.
 */
export async function create(data: { fullName: string; purpose: string }) {
  // TODO: Use prisma.visitor.create() to insert a new visitor
  // The status should default to "PENDING"
}

/**
 * Mark a visitor as CHECKED_IN and record their arrival time.
 */
export async function checkIn(id: string) {
  // TODO: Use prisma.visitor.update() to set status = "CHECKED_IN" and timeIn = now
}

/**
 * Mark a visitor as CHECKED_OUT and record their departure time.
 */
export async function checkOut(id: string) {
  // TODO: Use prisma.visitor.update() to set status = "CHECKED_OUT" and timeOut = now
}
