/**
 * The typing for the __params__ of the `generateSpacing` function.
 */
export interface GenerateSpacingParams {
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
export interface Spacing {
  /**
   * Calculate the default value and returns it as a number.
   *
   * @param asNumber - __asNumber__ tells the function to return a number instead of a string.
   * @returns a number
   */
  (asNumber: true): number
  /**
   * Calculates the value based on the spacing and returns it as a string.
   *
   * @param multiplier - __multiplier__ is the value used to multiply increment.
   * - Default: `1`
   * @returns a unit string `'<multiplier>px'`
   */
  (multiplier?: number, asNumber?: false): string
  /**
   * Calculates the value based on the spacing and returns it as a number.
   *
   * @param multiplier - __multiplier__ is the value used to multiply increment.
   * - Default: `1`
   * @param asNumber - __asNumber__ tells the function to return a number instead of a string.
   * @returns a number
   */
  (multiplier: number, asNumber: true): number
  /**
   * Calculates the value based on vertical and horizontal and returns it as a string.
   *
   * @param vertical - __vertical__ is the value used define the vertical axis unit.
   * @param horizontal - __horizontal__ is the value used define the horizontal axis unit.
   * @returns a unit string `'<vertical>px <horizontal>px'`
   */
  (vertical: number, horizontal: number): string
  /**
   * Calculates the value based on top, horizontal and bottom and returns it as a string.
   *
   * @param top - __top__ is the value used define the top size unit.
   * @param horizontal - __horizontal__ is the value used define the horizontal axis unit.
   * @param bottom - __bottom__ is the value used define the bottom size unit.
   * @returns a unit string `'<top>px <horizontal>px <bottom>px'`
   */
  (top: number, horizontal: number, bottom: number): string
  /**
   * Calculates the value based on top, right, bottom and left and returns it as a string.
   *
   * @param top - __top__ is the value used define the top side unit.
   * @param right - __right__ is the value used define the right side unit.
   * @param bottom - __bottom__ is the value used define the bottom side unit.
   * @param left - __left__ is the value used define the left side unit.
   * @returns a unit string `'<top>px <right>px <bottom>px <left>px'`
   */
  (top: number, right: number, bottom: number, left: number): string
}

/**
 * The typing for the `generateSpacing` function.
 */
export interface GenerateSpacing {
  /**
   * Generates the spacing function.
   * The spacing function can be used to easily multiply numbers into pixels.
   *
   * @param options - __options__ object to initialize the function with.
   * @returns the spacing function.
   */
  (options?: GenerateSpacingParams): Spacing
}
