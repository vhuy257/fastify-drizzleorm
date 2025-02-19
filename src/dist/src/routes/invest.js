"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investRoutes = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const investRoutes = (fastify, _, done) => {
    fastify.get("/", async (request, response) => {
        const invest = await db_1.db.select().from(schema_1.investment);
        response.send({
            hello: "world",
            list: invest
        });
    });
    done();
};
exports.investRoutes = investRoutes;
