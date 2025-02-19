//import * as schema from "@api/db/schema";
import { Logger } from "@api/utils";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// eslint-disable-next-line import/no-mutable-exports
export let db: any;

export const initDb = async () => {
  const pool = await new Pool({
    connectionString: process.env.DATABASE_URL!,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
    .connect()
    .then((client) => {
      Logger.info("INIT", "Connected to database");

      return client;
    })
    .catch((error) => {
      Logger.error("INIT", `Failed to connect to database ${String(error)}}`);
      throw new Error(`Failed to connect to database ${String(error)}`);
    });

  db = drizzle({client: pool});
};