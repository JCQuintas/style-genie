import { RGBRegex, ColorEndRegex } from '../utils'
import { ColorArray } from '../index.types'

export const RGBToRGBArray = (color: string): ColorArray =>
  color
    .replace(RGBRegex, '')
    .replace(ColorEndRegex, '')
    .split(',')
    .map(parseFloat) as ColorArray
