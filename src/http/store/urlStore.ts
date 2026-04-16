const store = new Map<string, string>()

const generateCode = (): string => Math.random().toString(36).slice(2, 8)

export const saveUrl = (url: string): string => {
  let code = generateCode()
  while (store.has(code)) {
    code = generateCode()
  }
  store.set(code, url)
  return code
}

export const getUrl = (code: string): string | undefined => store.get(code)

export const clearStore = (): void => store.clear()
