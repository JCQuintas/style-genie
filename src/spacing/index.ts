const DEFAULT_INCREMENT = 8

export interface SpacingParams {
  increment?: number
}

export const spacing = (options?: SpacingParams) => (...args: any[]): string | number => {
  const r = (numberString: string) =>
    `${parseFloat(numberString) * ((options && options.increment) || DEFAULT_INCREMENT)}px`

  const a = typeof args[0] === 'number' ? `${args[0]}` : '1'

  const returnNumber = typeof args[1] === 'boolean' && args[1]

  if (returnNumber) return parseFloat(r(a).slice(0, -2))

  const b = typeof args[1] === 'number' ? `${args[1]}` : undefined
  const c = typeof args[2] === 'number' ? `${args[2]}` : undefined
  const d = typeof args[3] === 'number' ? `${args[3]}` : undefined

  if (a && b && c && d) return `${r(a)} ${r(b)} ${r(c)} ${r(d)}`
  if (a && b && c) return `${r(a)} ${r(b)} ${r(c)}`
  if (a && b) return `${r(a)} ${r(b)}`
  return `${r(a)}`
}
