import { ColorArray, RGBRegex, HSLRegex, ColorInput } from './constants'
import { getArrayFromRGBString } from './rgb-to-rgb'
import { getArrayFromHSLString } from './hsl-to-rgb'
import { getArrayFromHexString } from './hex-to-rgb'

export { ColorInput }

interface ManipulateParams {
  hueShift?: number
  illuminate?: number
  saturate?: number
  opacity?: number
}

const RGBToHSLArray = (color: ColorArray) => {
  const _r = color[0] / 255
  const _g = color[1] / 255
  const _b = color[2] / 255

  const cMin = Math.min(_r, _g, _b)
  const cMax = Math.max(_r, _g, _b)
  const delta = cMax - cMin
  let h = 0
  let s = 0
  let l = 0

  if (delta === 0) h = 0
  else if (cMax === _r) h = ((_g - _b) / delta) % 6
  else if (cMax === _g) h = (_b - _r) / delta + 2
  else h = (_r - _g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cMax + cMin) / 2

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return [h, s, l]
}

const applyHueShift = (hue: number, shift?: number) => {
  if (!shift) return hue
  const total = hue + shift
  return total < 360 ? total : total % 360
}

const applyTransform = (original: number, transform?: number) => {
  if (!transform) return original * 100
  return Math.min(Math.max(original * 100 * (1 + transform), 0), 100)
}

export const manipulate = (colorArray: ColorArray) => (options: ManipulateParams) => {
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

export const color = (color: ColorInput) => {
  const colorArray = getColorArray(color)
  return {
    color: `rgba(${colorArray.join(',')},1)`,
    manipulate: manipulate(colorArray),
    hexColor: `#${colorArray.map(v => `0${v.toString(16)}`.slice(-2)).join('')}`,
  }
}
