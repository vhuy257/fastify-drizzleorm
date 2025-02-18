import type { FastifyInstance } from "fastify";
import { db } from "@api/db";
import { investment } from "@api/db/schema";

export const investRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request, response) => {
    const invest = await db.select().from(investment);
    response.send({
      hello: "world",
      list: invest
    });
  });

  done();
};
