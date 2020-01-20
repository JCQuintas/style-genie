interface ScaleObject {
  sx: number
  sy?: number
}

type ScaleArray = [number, number?]

interface Scale3dObject {
  sx: number
  sy: number
  sz: number
}

type Scale3dArray = [number, number, number]

export type ScaleProp = ScaleObject | ScaleArray | number
export type ScaleXProp = number
export type ScaleYProp = number
export type ScaleZProp = number
export type Scale3dProp = Scale3dObject | Scale3dArray

export const scaleToString = (scale: ScaleProp) => {
  if (typeof scale === 'number') return `${scale}`
  if (Array.isArray(scale)) return scale.join(', ')
  return scale.sy ? `${scale.sx}, ${scale.sy}` : `${scale.sx}`
}
export const scaleXToString = scaleToString
export const scaleYToString = scaleToString
export const scaleZToString = scaleToString

export const scale3dToString = (scale3d: Scale3dProp) => {
  if (Array.isArray(scale3d)) return scale3d.join(', ')
  return `${scale3d.sx}, ${scale3d.sy}, ${scale3d.sz}`
}
