import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.visitor.createMany({
    data: [
      { fullName: "Nylla Mwangi", purpose: "Interview", status: "PENDING" },
      { fullName: "Jane Doe", purpose: "Meeting", status: "PENDING" },
      { fullName: "John Smith", purpose: "Office Tour", status: "PENDING" },
    ],
  });
  console.log("✅ Test visitors seeded");
}

main()
  .catch(console.error)
  .finally(async () => await pool.end());