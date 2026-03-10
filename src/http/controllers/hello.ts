import type { Controller } from "../Controller.ts";

export const helloController: Controller = async (request, reply) => {
  return reply.send({
    message: "Hello",
  });
};
