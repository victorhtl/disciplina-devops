import { describe, it, expect } from "vitest";
import { buildServer } from "../src/http/Server.ts";

describe("GET /", () => {
  it("returns 200 with message Hello", async () => {
    const server = buildServer(false);
    const response = await server.inject({ method: "GET", url: "/" });

    expect(response.statusCode).toBe(200);

    const body = response.json();
    expect(body.message).toBe("Hello");
  });
});
