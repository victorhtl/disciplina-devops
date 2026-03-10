import type { Controller } from "../Controller.ts";

export const healthController: Controller = async (request, reply) => {
  return reply.send({
    message: "Ok",
    timestamp: new Date(),
  });
};
