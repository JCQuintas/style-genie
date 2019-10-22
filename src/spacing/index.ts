const DEFAULT_INCREMENT = 8

export interface CreateSpacingParams {
  increment?: number
}

interface Spacing {
  (spacing?: number, asNumber?: false): string
  (spacing: number, asNumber: true): number
  (vertical: number, horizontal: number): string
  (top: number, horizontal: number, bottom: number): string
  (top: number, right: number, bottom: number, left: number): string
}

export const createSpacing = (options?: CreateSpacingParams) => {
  const spacing = (arg1?: number, arg2?: number | boolean, arg3?: number, arg4?: number): string | number => {
    const r = (numberString: string) =>
      `${parseFloat(numberString) * ((options && options.increment) || DEFAULT_INCREMENT)}px`

    const a = typeof arg1 === 'number' ? `${arg1}` : '1'

    const returnNumber = typeof arg2 === 'boolean' && arg2

    if (returnNumber) return parseFloat(r(a).slice(0, -2))

    const b = typeof arg2 === 'number' ? `${arg2}` : undefined
    const c = typeof arg3 === 'number' ? `${arg3}` : undefined
    const d = typeof arg4 === 'number' ? `${arg4}` : undefined

    if (a && b && c && d) return `${r(a)} ${r(b)} ${r(c)} ${r(d)}`
    if (a && b && c) return `${r(a)} ${r(b)} ${r(c)}`
    if (a && b) return `${r(a)} ${r(b)}`
    return `${r(a)}`
  }
  return spacing as Spacing
}
