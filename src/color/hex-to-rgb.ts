import { ColorArray } from './constants'

export const getArrayFromHexString = (color: string): ColorArray => {
  const shortHex = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i
  const longHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
  const result = color.length <= 4 ? shortHex.exec(color) : longHex.exec(color)

  const r = (result && parseInt(result[1].length === 1 ? result[1] + result[1] : result[1], 16)) || 0
  const g = (result && parseInt(result[2].length === 1 ? result[2] + result[2] : result[2], 16)) || 0
  const b = (result && parseInt(result[3].length === 1 ? result[3] + result[3] : result[3], 16)) || 0

  return [r, g, b]
}
