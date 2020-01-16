import { Manipulate, HueShiftFunction, IlluminateFunction, SaturateFunction, OpacityFunction } from './manipulate'

/**
 * A color array in the formats:
 * ```typescript
 * - [r, g, b]
 * - [r, g, b, a]
 * ```
 */
export type ColorArray = [number, number, number, number?]

export type ColorFormat = 'rgb' | 'rgba' | 'hex' | 'hsl' | 'hsla'

/**
 * ColorInput can have one of the following formats
 *
 * ```typescript
 * - 0
 * - [0, 0, 0]
 * - '#000'
 * - '#000000'
 * - 'rgb(0, 0, 0)'
 * - 'rgba(0, 0, 0, 1)'
 * - 'hsl(0, 0%, 0%)'
 * - 'hsla(0, 0%, 0%, 1)'
 * ```
 */
export type ColorInput = ColorArray | number | string

export interface FormatFunction {
  /**
   * A function to format the color output.
   *
   * @param format - __format__ the color format.
   * @returns a formatted color string with the transformations.
   */
  (format: ColorFormat): string
}

/**
 * The typing for the __params__ of the `generateColor` function.
 */
export interface GenerateColorParams {
  /**
   * `color` is the base color to be decorated, it can have one of the following formats.
   *
   * ```typescript
   * 0 | [0, 0, 0]
   * '#000' | '#000000' | '#000000FF'
   * 'rgb(0, 0, 0)' | 'rgba(0, 0, 0, 1)'
   * 'hsl(0, 0%, 0%)' | 'hsla(0, 0%, 0%, 1)'
   * ```
   */
  color: ColorInput
  /**
   * `format` it the default output format of the color.
   * - Default: `'rgba'`
   *
   * ```typescript
   * 'rgb' | 'rgba' | 'hex' | 'hsl' | 'hsla'
   * ```
   */
  format?: ColorFormat
}

/**
 * The typing for the __return__ value of the `generateColor` function.
 */
export interface Color {
  /**
   * The formatted color string.
   */
  color: string
  /**
   * A function to format the color output.
   *
   * @param format - __format__ the color format.
   * @returns a formatted color string with the transformations.
   */
  format: FormatFunction
  /**
   * A function to manipulate the properties of the color.
   *
   * @returns a formatted color string with the transformations.
   */
  manipulate: Manipulate
  /**
   * A function to manipulate the hue of the color.
   *
   * @returns a formatted color string with the transformation.
   */
  hueShift: HueShiftFunction
  /**
   * A function to manipulate the luminosity of the color.
   *
   * @returns a formatted color string with the transformation.
   */
  illuminate: IlluminateFunction
  /**
   * A function to manipulate the saturation of the color.
   *
   * @returns a formatted color string with the transformation.
   */
  saturate: SaturateFunction
  /**
   * A function to manipulate the opacity of the color.
   *
   * @returns a formatted color string with the transformation.
   */
  opacity: OpacityFunction
}

/**
 * The typing for the `generateColor` function.
 */
export interface GenerateColor {
  /**
   * Generates a color object.
   * It gives easy access to colors and the possibility to manipulate them.
   *
   * @param options - __options__ object to initialize the function with.
   * @returns the color object.
   */
  (options: GenerateColorParams): Color
  /**
   * Generates a color object.
   * It gives easy access to colors and the possibility to manipulate them.
   *
   * @param color - __color__ the color to use when generating the object.
   * @param format - __format__ the color format the output should use.
   * @returns the color object.
   */
  (color: ColorInput, format?: ColorFormat): Color
}
