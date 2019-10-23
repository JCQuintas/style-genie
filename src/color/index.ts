import { ColorArray, RGBRegex, HSLRegex, ColorInput } from './constants'
import { getArrayFromRGBString } from './rgb-to-rgb'
import { getArrayFromHSLString } from './hsl-to-rgb'
import { getArrayFromHexString } from './hex-to-rgb'
import { RGBToHSLArray } from './rgb-to-hsl'
import { applyHueShift } from './apply-hue-shift'
import { applyTransform } from './apply-transformation'

interface ManipulateParams {
  hueShift?: number
  illuminate?: number
  saturate?: number
  opacity?: number
}

interface Manipulate {
  (options: ManipulateParams): string
}

const manipulate = (colorArray: ColorArray) => (options: ManipulateParams) => {
  const hsl = RGBToHSLArray(colorArray)
  const { hueShift, illuminate, saturate, opacity } = options
  const h = applyHueShift(hsl[0], hueShift)
  const s = applyTransform(hsl[1], saturate)
  const l = applyTransform(hsl[2], illuminate)
  const o = typeof opacity === 'number' ? Math.min(Math.max(opacity, 0), 1) : 1
  return `hsla(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${o})`
}

const getColorArray = (color: ColorInput): ColorArray => {
  if (Array.isArray(color)) return color
  if (typeof color === 'number') return [color, color, color]
  if (color[0] === '#') return getArrayFromHexString(color)
  if (color.match(RGBRegex)) return getArrayFromRGBString(color)
  if (color.match(HSLRegex)) return getArrayFromHSLString(color)
  return [0, 0, 0]
}

type GenerateColorParams = ColorInput

type Color = {
  color: string
  manipulate: Manipulate
  hex: string
}

interface GenerateColor {
  (color: GenerateColorParams): Color
}

const generateColor: GenerateColor = (color: GenerateColorParams) => {
  const colorArray = getColorArray(color)
  return {
    color: `rgba(${colorArray.join(', ')}, 1)`,
    manipulate: manipulate(colorArray),
    hex: `#${colorArray.map(v => `0${v.toString(16)}`.slice(-2)).join('')}`,
  }
}

export { generateColor, GenerateColorParams, Color, GenerateColor }
