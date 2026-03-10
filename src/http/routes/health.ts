import type { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import { healthController } from "../controllers/health.ts";

export default function (
  fastify: FastifyInstance,
  _: unknown,
  done: HookHandlerDoneFunction,
) {
  fastify.get("/health", {}, healthController);

  done();
}
