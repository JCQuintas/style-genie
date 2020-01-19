import { TransformAngleUnit } from '../utils/index'

interface Rotate3dObject {
  x: number
  y: number
  z: number
  a: number | string
}

type Rotate3dArray = [number, number, number, number | string]

export type RotateProp = number | string
export type RotateXProp = RotateProp
export type RotateYProp = RotateProp
export type RotateZProp = RotateProp
export type Rotate3dProp = Rotate3dObject | Rotate3dArray | string

export const rotateToString = (rotate: RotateProp, unit: TransformAngleUnit) => {
  if (typeof rotate === 'string') return rotate
  return `${rotate}${unit}`
}
export const rotateXToString = rotateToString
export const rotateYToString = rotateToString
export const rotateZToString = rotateToString

export const rotate3dToString = (rotate3d: Rotate3dProp, unit: TransformAngleUnit) => {
  if (typeof rotate3d === 'string') return rotate3d
  if (Array.isArray(rotate3d)) return rotate3d.map((v, i) => (i === 3 ? rotateToString(v, unit) : v)).join(', ')
  return `${rotate3d.x}, ${rotate3d.y}, ${rotate3d.z}, ${rotateToString(rotate3d.a, unit)}`
}
