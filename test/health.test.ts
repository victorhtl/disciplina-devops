import { describe, it, expect } from "vitest";
import { buildServer } from "../src/http/Server.ts";

describe("GET /health", () => {
  it("returns 200 with message Ok and a timestamp", async () => {
    const server = buildServer(false);
    const response = await server.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);

    const body = response.json();
    expect(body.message).toBe("Ok");
    expect(body.timestamp).toBeDefined();
  });
});
