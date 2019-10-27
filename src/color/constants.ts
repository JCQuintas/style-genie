export const RGBRegex = /^rgba?\(/
export const HSLRegex = /^hsla?\(/
export const ColorEndRegex = /\).*$/

/**
 * A color array in the formats:
 * ```typescript
 * - [r, g, b]
 * - [r, g, b, a]
 * ```
 */
export type ColorArray = [number, number, number, number?]

export type ColorFormat = 'rgb' | 'rgba' | 'hex' | 'hsl' | 'hsla'

/**
 * ColorInput can have one of the following formats
 *
 * ```typescript
 * - 0
 * - [0, 0, 0]
 * - '#000'
 * - '#000000'
 * - 'rgb(0, 0, 0)'
 * - 'rgba(0, 0, 0, 1)'
 * - 'hsl(0, 0%, 0%)'
 * - 'hsla(0, 0%, 0%, 1)'
 * ```
 */
export type ColorInput = ColorArray | number | string
