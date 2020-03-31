import { ColorArray, ColorFormat } from '../index.types'
import { RGBToHSLArray } from './rgb-to-hsl'

export const colorFormatter = (colorArray: ColorArray, format: ColorFormat, hslInput?: boolean): string => {
  if (format === 'rgb' || format === 'rgba') {
    if ((!colorArray[3] || colorArray[3] === 1) && format === 'rgb') return `rgb(${colorArray.slice(0, 3).join(', ')})`
    return `rgba(${colorArray.join(', ')})`
  }
  if (format === 'hsl' || format === 'hsla') {
    const [h, s, l, a] = hslInput ? colorArray : RGBToHSLArray(colorArray)
    if (a === 1 && format === 'hsl') return `hsl(${h}, ${s}%, ${l}%)`
    return `hsla(${h}, ${s}%, ${l}%, ${a})`
  }
  return `#${colorArray
    .slice(0, 3)
    .map((v) => `0${v!.toString(16)}`.slice(-2))
    .join('')}`
}
