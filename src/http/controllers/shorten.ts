import type { Controller } from "../Controller.ts"
import { saveUrl } from "../store/urlStore.ts"

const isValidUrl = (raw: string): boolean => {
  try {
    const { protocol } = new URL(raw)
    return protocol === "http:" || protocol === "https:"
  } catch {
    return false
  }
}

export const shortenController: Controller = async (request, reply) => {
  const body = request.body as { url?: unknown }

  if (!body || typeof body.url !== "string" || body.url.trim() === "") {
    return reply.status(400).send({ error: "Missing required field: url" })
  }

  const url = body.url.trim()

  if (!isValidUrl(url)) {
    return reply.status(400).send({ error: "Invalid URL: must start with http:// or https://" })
  }

  const code = saveUrl(url)

  return reply.status(201).send({ code, short: `/r/${code}` })
}
