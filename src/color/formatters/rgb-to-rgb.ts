import { RGBRegex, ColorEndRegex } from '../constants'
import { ColorArray } from '../index.types'

export const RGBToRGBArray = (color: string): ColorArray =>
  color
    .replace(RGBRegex, '')
    .replace(ColorEndRegex, '')
    .split(',')
    .map(parseFloat) as ColorArray
