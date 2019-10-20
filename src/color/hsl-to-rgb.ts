import { ColorArray, HSLRegex, ColorEndRegex } from './constants'

const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

const HSLToRGB = ([h, s, l]: ColorArray): ColorArray => {
  let r = 0
  let g = 0
  let b = 0

  const _h = h > 1 ? h / 360 : h
  const _s = s > 1 ? s / 100 : s
  const _l = l > 1 ? l / 100 : l

  if (s == 0) {
    r = g = b = _l // achromatic
  } else {
    const q = _l < 0.5 ? _l * (1 + _s) : _l + _s - _l * _s
    const p = 2 * _l - q
    r = hue2rgb(p, q, _h + 1 / 3)
    g = hue2rgb(p, q, _h)
    b = hue2rgb(p, q, _h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

export const getArrayFromHSLString = (color: string): ColorArray =>
  HSLToRGB(color
    .replace(HSLRegex, '')
    .replace(ColorEndRegex, '')
    .replace(/%/g, '')
    .split(color.includes(',') ? ',' : ' ')
    .slice(0, 3)
    .map(v => parseInt(v, 10)) as ColorArray)
