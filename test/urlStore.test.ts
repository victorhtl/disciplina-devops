import { describe, it, expect, beforeEach } from "vitest"
import { saveUrl, getUrl, clearStore } from "../src/http/store/urlStore.ts"

describe("urlStore", () => {
  beforeEach(() => {
    clearStore()
  })

  it("saveUrl returns a 6-character alphanumeric code", () => {
    const code = saveUrl("https://example.com")
    expect(code).toMatch(/^[a-z0-9]{6}$/)
  })

  it("getUrl retrieves the original URL by code", () => {
    const code = saveUrl("https://example.com")
    expect(getUrl(code)).toBe("https://example.com")
  })

  it("getUrl returns undefined for an unknown code", () => {
    expect(getUrl("unknown")).toBeUndefined()
  })

  it("storing the same URL twice produces two distinct codes", () => {
    const code1 = saveUrl("https://example.com")
    const code2 = saveUrl("https://example.com")
    expect(code1).not.toBe(code2)
    expect(getUrl(code1)).toBe("https://example.com")
    expect(getUrl(code2)).toBe("https://example.com")
  })
})
