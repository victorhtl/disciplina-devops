import type { Controller } from "../Controller.ts"
import { getUrl } from "../store/urlStore.ts"

export const redirectController: Controller = async (request, reply) => {
  const { code } = request.params as { code: string }
  const url = getUrl(code)

  if (!url) {
    return reply.status(404).send({ error: `No URL found for code: ${code}` })
  }

  return reply.redirect(url)
}
