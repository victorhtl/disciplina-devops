import type { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import { helloController } from "../controllers/hello.ts";

export default function (
  fastify: FastifyInstance,
  _: unknown,
  done: HookHandlerDoneFunction,
) {
  fastify.get("/", {}, helloController);

  done();
}
