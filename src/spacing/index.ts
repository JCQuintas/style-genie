import { GenerateSpacingParams, GenerateSpacing, Spacing } from './index.types'

const defaultSpacingOptions: Required<GenerateSpacingParams> = {
  increment: 8,
  base: 0,
  unit: 'px',
}

const NegativeZeroGuard = (value: number) => {
  if (value > 0 || value < 0) return value
  return Object.is(-0, value) ? '-0' : value
}

/**
 * Generates the spacing function.
 * The spacing function can be used to easily multiply numbers into pixels.
 */
const generateSpacing: GenerateSpacing = (options?: GenerateSpacingParams) => {
  const spacing = (arg1?: number | boolean, arg2?: number | boolean, arg3?: number, arg4?: number): string | number => {
    const _increment = (options && options.increment) || defaultSpacingOptions.increment
    const _base = (options && options.base) || defaultSpacingOptions.base
    const _unit = (options && options.unit) || defaultSpacingOptions.unit
    const calculate = (numberString: string) => {
      if (numberString === '-0') return `0${_unit}`
      return `${_base + parseFloat(numberString) * _increment}${_unit}`
    }

    const a = typeof arg1 === 'number' ? `${NegativeZeroGuard(arg1)}` : '1'

    const returnNumber = (typeof arg2 === 'boolean' && arg2) || (typeof arg1 === 'boolean' && arg1)

    if (returnNumber) return parseFloat(calculate(a).slice(0, -_unit.length))

    const b = typeof arg2 === 'number' ? `${NegativeZeroGuard(arg2)}` : undefined
    const c = typeof arg3 === 'number' ? `${NegativeZeroGuard(arg3)}` : undefined
    const d = typeof arg4 === 'number' ? `${NegativeZeroGuard(arg4)}` : undefined

    return [a, b, c, d]
      .filter((v): v is string => !!v)
      .map(calculate)
      .join(' ')
  }
  return spacing as Spacing
}

export { generateSpacing, defaultSpacingOptions, GenerateSpacingParams, Spacing, GenerateSpacing }
