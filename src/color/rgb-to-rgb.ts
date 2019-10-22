import { ColorArray, RGBRegex, ColorEndRegex } from './constants'

export const getArrayFromRGBString = (color: string): ColorArray =>
  color
    .replace(RGBRegex, '')
    .replace(ColorEndRegex, '')
    .split(',')
    .slice(0, 3)
    .map(v => parseInt(v, 10)) as ColorArray
