import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await pool.query(`
    INSERT INTO "Visitor" (id, "fullName", purpose, status, "createdAt")
    VALUES 
      (gen_random_uuid(), 'Nylla Mwangi', 'Interview', 'PENDING', NOW()),
      (gen_random_uuid(), 'Jane Doe', 'Meeting', 'CHECKED_IN', NOW()),
      (gen_random_uuid(), 'John Smith', 'Office Tour', 'PENDING', NOW())
    ON CONFLICT DO NOTHING;
  `);
  
  console.log("✅ Test visitors seeded");
}

main()
  .catch(console.error)
  .finally(async () => await pool.end());