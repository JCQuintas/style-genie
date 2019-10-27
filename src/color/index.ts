import { ColorArray, RGBRegex, HSLRegex, ColorInput, ColorFormat } from './constants'
import { RGBToRGBArray } from './rgb-to-rgb'
import { HSLtoRGBArray } from './hsl-to-rgb'
import { hexToRGBArray } from './hex-to-rgb'
import { Manipulate, generateManipulate } from './manipulate'
import { colorFormatter } from './color-formatter'

const getColorArray = (color: ColorInput): ColorArray => {
  const getArrayBasedOnInput = (color: ColorInput): ColorArray => {
    if (Array.isArray(color)) return color
    if (typeof color === 'number') return [color, color, color]
    if (color[0] === '#') return hexToRGBArray(color)
    if (color.match(RGBRegex)) return RGBToRGBArray(color)
    if (color.match(HSLRegex)) return HSLtoRGBArray(color)
    return [0, 0, 0]
  }

  const verifyOutput = ([r, g, b, a]: ColorArray): ColorArray => [
    Math.min(Math.max(r, 0), 255),
    Math.min(Math.max(g, 0), 255),
    Math.min(Math.max(b, 0), 255),
    Math.min(Math.max(a || 1, 0), 1),
  ]

  return verifyOutput(getArrayBasedOnInput(color))
}

const isOptionsObject = (value: any): value is GenerateColorParams => value && value.color

interface FormatFunction {
  /**
   * A function to format the color output.
   *
   * @param format - __format__ the color format.
   * @returns a formatted color string with the transformations.
   */
  (format: ColorFormat): string
}

export const defaultColorOptions: Required<GenerateColorParams> = {
  color: 0,
  format: 'rgba',
}

/**
 * The typing for the __params__ of the `generateColor` function.
 */
interface GenerateColorParams {
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
interface Color {
  /**
   * The formatted color string.
   */
  color: string
  /**
   * A function to manipulate the properties of the color.
   *
   * @returns a formatted color string with the transformations.
   */
  manipulate: Manipulate
  /**
   * A function to format the color output.
   *
   * @param format - __format__ the color format.
   * @returns a formatted color string with the transformations.
   */
  format: FormatFunction
}

/**
 * The typing for the `generateColor` function.
 */
interface GenerateColor {
  /**
   * Generates a color object.
   *
   * @param options - __options__ object to initialize the function with.
   * @returns the color object.
   */
  (options: GenerateColorParams): Color
  /**
   * Generates a color object.
   *
   * @param color - __color__ the color to use when generating the object.
   * @param format - __format__ the color format the output should use.
   * @returns the color object.
   */
  (color: ColorInput, format?: ColorFormat): Color
}

const generateColor: GenerateColor = (options: GenerateColorParams | ColorInput, format?: ColorFormat) => {
  const _color = isOptionsObject(options) ? options.color : options
  const _format = (isOptionsObject(options) && options && options.format) || format || defaultColorOptions.format
  const colorArray = getColorArray(_color)
  return {
    color: colorFormatter(colorArray, _format),
    manipulate: generateManipulate(colorArray, _format),
    format: (format: ColorFormat) => colorFormatter(colorArray, format),
  }
}

export { generateColor, GenerateColorParams, Color, GenerateColor }
