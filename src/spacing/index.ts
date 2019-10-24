const defaultSpacingOptions: Required<GenerateSpacingParams> = {
  increment: 8,
  base: 0,
  unit: 'px',
}

/**
 * The typing for the __params__ of the `generateBreakpoint` function.
 */
interface GenerateSpacingParams {
  /**
   * `increment` is the amount that will be multiplied by the input value.
   * - Default: `8`
   */
  increment?: number
  /**
   * `base` is the base number of the calculation.
   * - Default: `0`
   */
  base?: number
  /**
   * `unit` is the unit to be used when returning strings.
   * - Default: `'px'`
   */
  unit?: string
}

/**
 * The typing for the __return__ value of the `generateSpacing` function.
 */
interface Spacing {
  /**
   * Calculate the default value and returns it as a number.
   *
   * @returns a number
   */
  (asNumber: true): number
  /**
   * Calculates the value based on the spacing and returns it as a string.
   *
   * @param spacing - __spacing__ is the value used to multiply increment.
   * - Default: `1`
   * @returns a unit string `'--px'`
   */
  (spacing?: number, asNumber?: false): string
  /**
   * Calculates the value based on the spacing and returns it as a number.
   *
   * @param spacing - __spacing__ is the value used to multiply increment.
   * - Default: `1`
   * @returns a number
   */
  (spacing: number, asNumber: true): number
  /**
   * Calculates the value based on vertical and horizontal and returns it as a string.
   *
   * @param vertical - __vertical__ is the value used define the vertical axis unit.
   * @param horizontal - __horizontal__ is the value used define the horizontal axis unit.
   * @returns a unit string `'--px --px'`
   */
  (vertical: number, horizontal: number): string
  /**
   * Calculates the value based on top, horizontal and bottom and returns it as a string.
   *
   * @param top - __top__ is the value used define the top size unit.
   * @param horizontal - __horizontal__ is the value used define the horizontal axis unit.
   * @param bottom - __bottom__ is the value used define the bottom size unit.
   * @returns a unit string `'--px --px --px'`
   */
  (top: number, horizontal: number, bottom: number): string
  /**
   * Calculates the value based on top, right, bottom and left and returns it as a string.
   *
   * @param top - __top__ is the value used define the top side unit.
   * @param right - __right__ is the value used define the right side unit.
   * @param bottom - __bottom__ is the value used define the bottom side unit.
   * @param left - __left__ is the value used define the left side unit.
   * @returns a unit string `'--px --px --px --px'`
   */
  (top: number, right: number, bottom: number, left: number): string
}

/**
 * The typing for the `generateSpacing` function.
 */
interface GenerateSpacing {
  /**
   * Generates the spacing function. It can be used to easily multiply numbers into pixels.
   *
   * @param options - __options__ object to initialize the function with.
   * @returns the spacing function.
   */
  (options?: GenerateSpacingParams): Spacing
}

const generateSpacing: GenerateSpacing = (options?: GenerateSpacingParams) => {
  const spacing = (arg1?: number | boolean, arg2?: number | boolean, arg3?: number, arg4?: number): string | number => {
    const _increment = (options && options.increment) || defaultSpacingOptions.increment
    const _base = (options && options.base) || defaultSpacingOptions.base
    const _unit = (options && options.unit) || defaultSpacingOptions.unit
    const calculate = (numberString: string) => `${_base + parseFloat(numberString) * _increment}${_unit}`

    const a = typeof arg1 === 'number' ? `${arg1}` : '1'

    const returnNumber = (typeof arg2 === 'boolean' && arg2) || (typeof arg1 === 'boolean' && arg1)

    if (returnNumber) return parseFloat(calculate(a).slice(0, -_unit.length))

    const b = typeof arg2 === 'number' ? `${arg2}` : undefined
    const c = typeof arg3 === 'number' ? `${arg3}` : undefined
    const d = typeof arg4 === 'number' ? `${arg4}` : undefined

    return [a, b, c, d]
      .filter((v): v is string => !!v)
      .map(calculate)
      .join(' ')
  }
  return spacing as Spacing
}

export { generateSpacing, defaultSpacingOptions, GenerateSpacingParams, Spacing, GenerateSpacing }
