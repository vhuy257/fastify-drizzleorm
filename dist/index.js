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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const routes_1 = require("./src/routes");
const fastify_1 = __importDefault(require("fastify"));
const middleware_1 = require("./modules/middleware");
const db_1 = require("./db");
// eslint-disable-next-line @typescript-eslint/naming-convention
const API_VERSION = "v1";
const main = async () => {
    const server = (0, fastify_1.default)({
        bodyLimit: 1_000_000,
        trustProxy: true,
    });
    await (0, db_1.initDb)();
    //await Redis.initialize();
    server.register(middleware_1.middleware);
    server.register(Promise.resolve().then(() => __importStar(require("@fastify/cors"))), {
        maxAge: 600,
        origin: false,
        credentials: false,
    });
    await server.register(Promise.resolve().then(() => __importStar(require('@fastify/swagger'))));
    await server.register(Promise.resolve().then(() => __importStar(require('@fastify/swagger-ui'))), {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next(); },
            preHandler: function (request, reply, next) { next(); }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
        transformSpecificationClone: true
    });
    // Routes
    server.register(routes_1.investRoutes, {
        prefix: `/${API_VERSION}/invests`,
    });
    // server.listen({ host: env.HOST, port: env.PORT }, (error, address) => {
    //   if (error) {
    //     Logger.error("INIT", error.message);
    //     throw new Error(error.message);
    //   }
    //   Logger.info("INIT", `Server listening at ${address}`);
    // });
    return server;
};
exports.main = main;
(0, exports.main)();
