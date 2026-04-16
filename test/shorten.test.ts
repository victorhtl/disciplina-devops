import { describe, it, expect, beforeEach } from "vitest"
import { buildServer } from "../src/http/Server.ts"
import { clearStore } from "../src/http/store/urlStore.ts"

describe("POST /shorten", () => {
  beforeEach(() => {
    clearStore()
  })

  it("returns 201 with code and short fields for a valid http URL", async () => {
    const server = buildServer(false)
    const response = await server.inject({
      method: "POST",
      url: "/shorten",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: "http://example.com" }),
    })

    expect(response.statusCode).toBe(201)
    const body = response.json()
    expect(body.code).toMatch(/^[a-z0-9]{6}$/)
    expect(body.short).toBe(`/r/${body.code}`)
  })

  it("returns 201 with code and short fields for a valid https URL", async () => {
    const server = buildServer(false)
    const response = await server.inject({
      method: "POST",
      url: "/shorten",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: "https://opencode.ai/docs" }),
    })

    expect(response.statusCode).toBe(201)
    const body = response.json()
    expect(body.code).toMatch(/^[a-z0-9]{6}$/)
    expect(body.short).toBe(`/r/${body.code}`)
  })

  it("returns 400 when the url field is missing", async () => {
    const server = buildServer(false)
    const response = await server.inject({
      method: "POST",
      url: "/shorten",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    })

    expect(response.statusCode).toBe(400)
    expect(response.json().error).toMatch(/missing/i)
  })

  it("returns 400 when the url is not a valid http/https URL", async () => {
    const server = buildServer(false)
    const response = await server.inject({
      method: "POST",
      url: "/shorten",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: "ftp://not-allowed.com" }),
    })

    expect(response.statusCode).toBe(400)
    expect(response.json().error).toMatch(/invalid url/i)
  })

  it("returns 400 when the url is a plain string (not a URL)", async () => {
    const server = buildServer(false)
    const response = await server.inject({
      method: "POST",
      url: "/shorten",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: "not-a-url-at-all" }),
    })

    expect(response.statusCode).toBe(400)
    expect(response.json().error).toMatch(/invalid url/i)
  })
})

describe("GET /r/:code", () => {
  beforeEach(() => {
    clearStore()
  })

  it("returns 302 and redirects to the original URL for a valid code", async () => {
    const server = buildServer(false)

    const shortenResponse = await server.inject({
      method: "POST",
      url: "/shorten",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: "https://example.com" }),
    })
    const { code } = shortenResponse.json()

    const redirectResponse = await server.inject({ method: "GET", url: `/r/${code}` })

    expect(redirectResponse.statusCode).toBe(302)
    expect(redirectResponse.headers.location).toBe("https://example.com")
  })

  it("returns 404 for an unknown code", async () => {
    const server = buildServer(false)
    const response = await server.inject({ method: "GET", url: "/r/xxxxxx" })

    expect(response.statusCode).toBe(404)
    expect(response.json().error).toMatch(/no url found/i)
  })
})
