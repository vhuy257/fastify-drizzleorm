"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = exports.db = void 0;
const schema = __importStar(require("../src/db/schema"));
const utils_1 = require("../src/utils");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const pg_1 = require("pg");
const initDb = async () => {
    const pool = await new pg_1.Pool({
        connectionString: utils_1.env.DATABASE_URL,
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
    exports.db = (0, node_postgres_1.drizzle)(pool, {
        schema,
    });
    await (0, migrator_1.migrate)(exports.db, {
        migrationsFolder: "./src/db/migrations",
    })
        .then(() => {
        utils_1.Logger.info("INIT", "Migrated database");
    })
        .catch((error) => {
        utils_1.Logger.error("INIT", `Failed to migrate database ${String(error)}`);
        throw new Error(`Failed to migrate database ${String(error)}`);
    });
};
exports.initDb = initDb;
