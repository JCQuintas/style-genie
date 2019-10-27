import { ColorArray, RGBRegex, ColorEndRegex } from './constants'

export const RGBToRGBArray = (color: string): ColorArray =>
  color
    .replace(RGBRegex, '')
    .replace(ColorEndRegex, '')
    .split(',')
    .map(parseFloat) as ColorArray
