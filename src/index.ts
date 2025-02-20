import { investRoutes } from "@api/routes";
import fastify from "fastify";
import { middleware } from "./modules/middleware";
import { Logger } from "./utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
const API_VERSION = "v1";

const port = 3000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

export const main = async () => {
  const server = fastify();

  //await Redis.initialize();

  server.register(middleware);
  server.register(import("@fastify/cors"), {
    maxAge: 600,
    origin: false,
    credentials: false,
  });

  await server.register(import('@fastify/swagger'))

  await server.register(import('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })

  // Routes
  server.register(investRoutes, {
    prefix: `/${API_VERSION}/invests`,
  });

  server.listen({host: host, port: port }, (error, address) => {
    if (error) {
      Logger.error("INIT", error.message);
      // throw new Error(error.message);
      server.log.error(error)
      process.exit(1)
    }

    Logger.info("INIT", `Server listening at ${address}`);
  });

  return server;
};

main();
