import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// safety check (VERY IMPORTANT)
if (!process.env.PG_PASSWORD) {
  throw new Error("PG_PASSWORD is missing in .env file");
}

const client = new Pool({
  host: "aws-1-ap-south-1.pooler.supabase.com",
  port: 6543,
  user: "postgres.kswvqlgprhgcptmlvvpd",
  password: "Sjaswanth777#",
  database: "postgres",
  maxUses: 4,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => {
    console.log("PostgreSQL Connected");
  })
  .catch((err: Error) => {
    console.log("DB Connection Error:", err);
  });

export default client;