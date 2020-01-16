import { RGBToRGBArray, HSLtoRGBArray, hexToRGBArray } from '../formatters'
import { RGBRegex, HSLRegex } from './constants'
import { ColorInput, ColorArray } from '../index.types'

export const getColorArray = (color: ColorInput): ColorArray => {
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
