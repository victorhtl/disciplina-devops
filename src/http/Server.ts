import Fastify from "fastify";
import healthRoute from "./routes/health.ts";
import helloRoute from "./routes/Hello.ts";

export const setupServer = () => {
  const server = Fastify({
    logger: true,
  });

  server.register(healthRoute);
  server.register(helloRoute);

  server.listen({ port: 3000 }, function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
};
