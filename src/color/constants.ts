export const RGBRegex = /^rgba?\(/
export const HSLRegex = /^hsla?\(/
export const ColorEndRegex = /\).*$/

export type ColorArray = [number, number, number]

export type ColorInput = ColorArray | number | string
