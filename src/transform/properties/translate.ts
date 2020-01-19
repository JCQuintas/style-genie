import { TransformPercentageUnit, TransformLengthUnit } from '../utils'

interface TranslateObject {
  tx: number | string
  ty?: number | string
}

type TranslateArray = [number | string, (number | string)?]

interface Translate3dObject {
  tx: number | string
  ty: number | string
  tz: number | string
}

type Translate3dArray = [number | string, number | string, number | string]

export type TranslateProp = TranslateObject | TranslateArray | number | string
export type Translate3dProp = Translate3dObject | Translate3dArray | string
export type TranslateXProp = number | string
export type TranslateYProp = number | string
export type TranslateZProp = number | string

interface TransformUnit {
  xy: TransformPercentageUnit | TransformLengthUnit
  z: TransformLengthUnit
}

export const translateToString = (translate: TranslateProp, unit: TransformUnit): string => {
  if (typeof translate === 'string') return translate
  if (typeof translate === 'number') return `${translate}${unit.xy}`
  if (Array.isArray(translate))
    return translate
      .filter(Boolean)
      .map(v => translateToString(v!, unit))
      .join(', ')
  return translate.ty
    ? `${translateToString(translate.tx, unit)}, ${translateToString(translate.ty, unit)}`
    : `${translateToString(translate.tx, unit)}`
}

export const translateXToString = translateToString
export const translateYToString = translateToString
export const translateZToString = (translate: TranslateZProp, unit: TransformUnit) => {
  if (typeof translate === 'string') return translate
  return `${translate}${unit.z}`
}

export const translate3dToString = (translate3d: Translate3dProp, unit: TransformUnit) => {
  if (typeof translate3d === 'string') return translate3d
  if (Array.isArray(translate3d))
    return translate3d.map((v, i) => (i === 2 ? translateZToString(v, unit) : translateToString(v, unit))).join(', ')
  return `${translateToString(translate3d.tx, unit)}, ${translateToString(translate3d.ty, unit)}, ${translateZToString(
    translate3d.tz,
    unit
  )}`
}
