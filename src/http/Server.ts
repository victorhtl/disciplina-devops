import Fastify from "fastify";
import healthRoute from "./routes/health.ts";
import helloRoute from "./routes/hello.ts";

export const buildServer = (logger = true) => {
  const server = Fastify({ logger });

  server.register(healthRoute);
  server.register(helloRoute);

  return server;
};

export const setupServer = () => {
  const server = buildServer();

  server.listen({ port: 3000 }, function (err, _address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
};
