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

const manipulate = (colorArray: ColorArray) => (options: ManipulateParams) => {
  const hsl = RGBToHSLArray(colorArray)
  const { hueShift, illuminate, saturate, opacity } = options
  const h = applyHueShift(hsl[0], hueShift)
  const s = applyTransform(hsl[1], saturate)
  const l = applyTransform(hsl[2], illuminate)
  const o = typeof opacity === 'number' ? opacity : 1
  return `hsla(${h}, ${s}%, ${l}%, ${o})`
}

const getColorArray = (color: ColorInput): ColorArray => {
  if (Array.isArray(color)) return color
  if (typeof color === 'number') return [color, color, color]
  if (color[0] === '#') return getArrayFromHexString(color)
  if (color.match(RGBRegex)) return getArrayFromRGBString(color)
  if (color.match(HSLRegex)) return getArrayFromHSLString(color)
  return [0, 0, 0]
}

export type CreateColorParams = ColorInput

export const createColor = (color: CreateColorParams) => {
  const colorArray = getColorArray(color)
  return {
    color: `rgba(${colorArray.join(',')},1)`,
    manipulate: manipulate(colorArray),
    hexColor: `#${colorArray.map(v => `0${v.toString(16)}`.slice(-2)).join('')}`,
  }
}
