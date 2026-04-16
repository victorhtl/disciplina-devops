import Fastify from "fastify";
import healthRoute from "./routes/health.ts";
import helloRoute from "./routes/hello.ts";
import shortenRoute from "./routes/shorten.ts";

export const buildServer = (logger = true) => {
  const server = Fastify({ logger });

  server.register(healthRoute);
  server.register(helloRoute);
  server.register(shortenRoute);

  return server;
};

export const setupServer = () => {
  const server = buildServer();

  server.listen({ port: 3000, host: "0.0.0.0" }, function (err, _address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
};
