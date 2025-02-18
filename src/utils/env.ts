/* eslint-disable @typescript-eslint/naming-convention */
import { z } from "zod";
// eslint-disable-next-line import/no-unassigned-import
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string().default("postgresql://default:RY5rnIp6btsi@ep-billowing-lab-a1oxpqbk-pooler.ap-southeast-1.aws.neon.tech/verceldb?sslmode=require"),
  //REDIS_URL: z.string().default("redis://127.0.0.1:6379/"),
  PORT: z.coerce.number().default(8080),
  HOST: z.string().default("127.0.0.1"),
});

export const env = envSchema.parse(process.env);
