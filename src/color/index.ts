import { getColorArray } from './utils'
import { colorFormatter } from './formatters'
import { generateManipulate } from './manipulate'
import { ColorInput, ColorFormat, GenerateColorParams, GenerateColor, Color } from './index.types'

const isOptionsObject = (value: any): value is GenerateColorParams => value && value.color

export const defaultColorOptions: Required<GenerateColorParams> = {
  color: 0,
  format: 'rgba',
}

/**
 * Generates a color object.
 * It gives easy access to colors and the possibility to manipulate them.
 */
const generateColor: GenerateColor = (options: GenerateColorParams | ColorInput, format?: ColorFormat) => {
  const _color = isOptionsObject(options) ? options.color : options
  const _format = (isOptionsObject(options) && options && options.format) || format || defaultColorOptions.format
  const colorArray = getColorArray(_color)
  const _manipulate = generateManipulate(colorArray, _format)
  return {
    color: colorFormatter(colorArray, _format),
    format: (format: ColorFormat) => colorFormatter(colorArray, format),
    manipulate: _manipulate,
    hueShift: (hueShift?: number) => _manipulate({ hueShift }),
    illuminate: (illuminate?: number) => _manipulate({ illuminate }),
    saturate: (saturate?: number) => _manipulate({ saturate }),
    opacity: (opacity?: number) => _manipulate({ opacity }),
  }
}

export { generateColor, GenerateColorParams, Color, GenerateColor }
