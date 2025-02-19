"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = exports.db = void 0;
//import * as schema from "../db/schema";
const utils_1 = require("../utils");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const initDb = async () => {
    const pool = await new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
    })
        .connect()
        .then((client) => {
        utils_1.Logger.info("INIT", "Connected to database");
        return client;
    })
        .catch((error) => {
        utils_1.Logger.error("INIT", `Failed to connect to database ${String(error)}}`);
        throw new Error(`Failed to connect to database ${String(error)}`);
    });
    exports.db = (0, node_postgres_1.drizzle)({ client: pool });
};
exports.initDb = initDb;
