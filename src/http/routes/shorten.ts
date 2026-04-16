import type { FastifyInstance, HookHandlerDoneFunction } from "fastify"
import { shortenController } from "../controllers/shorten.ts"
import { redirectController } from "../controllers/redirect.ts"

export default function (fastify: FastifyInstance, _: unknown, done: HookHandlerDoneFunction) {
  fastify.post("/shorten", {}, shortenController)
  fastify.get("/r/:code", {}, redirectController)
  done()
}
