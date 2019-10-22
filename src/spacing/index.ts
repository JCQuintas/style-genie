const DEFAULT_INCREMENT = 8

export interface CreateSpacingParams {
  increment?: number
}

export interface Spacing {
  (asNumber: true): number
  (spacing?: number, asNumber?: false): string
  (spacing: number, asNumber: true): number
  (vertical: number, horizontal: number): string
  (top: number, horizontal: number, bottom: number): string
  (top: number, right: number, bottom: number, left: number): string
}

export const createSpacing = (options?: CreateSpacingParams) => {
  const spacing = (arg1?: number | boolean, arg2?: number | boolean, arg3?: number, arg4?: number): string | number => {
    const calculate = (numberString: string) =>
      `${parseFloat(numberString) * ((options && options.increment) || DEFAULT_INCREMENT)}px`

    const a = typeof arg1 === 'number' ? `${arg1}` : '1'

    const returnNumber = (typeof arg2 === 'boolean' && arg2) || (typeof arg1 === 'boolean' && arg1)

    if (returnNumber) return parseFloat(calculate(a).slice(0, -2))

    const b = typeof arg2 === 'number' ? `${arg2}` : undefined
    const c = typeof arg3 === 'number' ? `${arg3}` : undefined
    const d = typeof arg4 === 'number' ? `${arg4}` : undefined

    if (a && b && c && d) return `${calculate(a)} ${calculate(b)} ${calculate(c)} ${calculate(d)}`
    if (a && b && c) return `${calculate(a)} ${calculate(b)} ${calculate(c)}`
    if (a && b) return `${calculate(a)} ${calculate(b)}`
    return `${calculate(a)}`
  }
  return spacing as Spacing
}
