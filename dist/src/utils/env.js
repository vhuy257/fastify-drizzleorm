"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const zod_1 = require("zod");
// eslint-disable-next-line import/no-unassigned-import
require("dotenv/config");
const envSchema = zod_1.z.object({
    //DATABASE_URL: z.string().default(process.env.DATABASE_URL!),
    // REDIS_URL: z.string().default("redis://127.0.0.1:6379/"),
    PORT: zod_1.z.coerce.number().default(8080),
    HOST: zod_1.z.string().default("127.0.0.1"),
});
exports.env = envSchema.parse(process.env);
