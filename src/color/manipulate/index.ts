import { RGBToHSLArray, HSLArrayToRGBArray, colorFormatter } from '../formatters'
import { applyHueShift } from './apply-hue-shift'
import { applyTransform } from './apply-transformation'
import { ColorArray, ColorFormat } from '../index.types'
import {
  ManipulateParams,
  Manipulate,
  OpacityFunction,
  HueShiftFunction,
  IlluminateFunction,
  SaturateFunction,
} from './manipulate.types'

export const generateManipulate = (colorArray: ColorArray, format: ColorFormat) => (options: ManipulateParams) => {
  const hsl = RGBToHSLArray(colorArray)
  const { hueShift, illuminate, saturate, opacity } = options
  const h = applyHueShift(hsl[0], hueShift)
  const s = applyTransform(hsl[1], saturate)
  const l = applyTransform(hsl[2], illuminate)
  const a = typeof opacity === 'number' ? Math.min(Math.max(opacity, 0), 1) : 1

  const HSLArray = [Math.round(h), Math.round(s), Math.round(l), a] as ColorArray

  if (format === 'hsl' || format === 'hsla') return colorFormatter(HSLArray, format, true)

  return colorFormatter(HSLArrayToRGBArray(HSLArray), format)
}

export { Manipulate, OpacityFunction, HueShiftFunction, IlluminateFunction, SaturateFunction }
