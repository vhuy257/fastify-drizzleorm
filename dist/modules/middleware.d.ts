import type { FastifyInstance } from "fastify";
declare const middleware: (fastify: FastifyInstance, _options: unknown) => Promise<void>;
export { middleware };
