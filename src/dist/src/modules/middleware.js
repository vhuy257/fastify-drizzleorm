"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
//import { Redis } from "../utils";
const db_1 = require("../db");
const middleware = (0, fastify_plugin_1.default)(async (fastify, _options) => {
    fastify.addHook("onRequest", async (request) => {
        //request.redis = Redis;
        request.db = db_1.db;
    });
});
exports.middleware = middleware;
