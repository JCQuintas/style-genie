import { ColorArray } from '../index.types'

export const RGBToHSLArray = (color: ColorArray): ColorArray => {
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

  s = parseFloat((s * 100).toFixed(1))
  l = parseFloat((l * 100).toFixed(1))

  return [Math.round(h), Math.round(s), Math.round(l), color[3]]
}
