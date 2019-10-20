import { ColorArray, RGBRegex, HSLRegex, ColorInput } from './constants'
import { getArrayFromRGBString } from './rgb-to-rgb'
import { getArrayFromHSLString } from './hsl-to-rgb'
import { getArrayFromHexString } from './hex-to-rgb'
import { manipulate } from './manipulate'

export { ColorInput }

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
