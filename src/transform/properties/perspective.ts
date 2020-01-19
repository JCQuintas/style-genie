import { TransformLengthUnit } from '../utils/index'

export type PerspectiveProp = number | string

export const perspectiveToString = (perspective: PerspectiveProp, unit: TransformLengthUnit) => {
  if (typeof perspective === 'string') return perspective
  return `${perspective}${unit}`
}
