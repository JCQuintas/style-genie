import { TransformAngleUnit } from '../utils'

interface SkewObject {
  ax: number | string
  ay?: number | string
}

type SkewArray = [number | string, (number | string)?]

export type SkewProp = SkewObject | SkewArray | number | string
export type SkewXProp = number | string
export type SkewYProp = number | string

export const skewToString = (skew: SkewProp, unit: TransformAngleUnit): string => {
  if (typeof skew === 'string') return skew
  if (typeof skew === 'number') return `${skew}${unit}`
  if (Array.isArray(skew))
    return skew
      .filter(Boolean)
      .map(v => skewToString(v!, unit))
      .join(', ')
  return skew.ay ? `${skewToString(skew.ax, unit)}, ${skewToString(skew.ay, unit)}` : skewToString(skew.ax, unit)
}

export const skewXToString = skewToString
export const skewYToString = skewToString
