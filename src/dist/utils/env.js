"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const zod_1 = require("zod");
// eslint-disable-next-line import/no-unassigned-import
require("dotenv/config");
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().default("postgresql://default:RY5rnIp6btsi@ep-billowing-lab-a1oxpqbk-pooler.ap-southeast-1.aws.neon.tech/verceldb?sslmode=require"),
    // REDIS_URL: z.string().default("redis://127.0.0.1:6379/"),
    PORT: zod_1.z.coerce.number().default(8080),
    HOST: zod_1.z.string().default("127.0.0.1"),
});
exports.env = envSchema.parse(process.env);
