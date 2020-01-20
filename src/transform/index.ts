import { GenerateTransform, GenerateTransformParams, Transform, TransformProps } from './index.types'
import { addFunctionMarkup } from './utils/index'
import {
  matrixToString,
  matrix3dToString,
  perspectiveToString,
  rotateToString,
  rotateXToString,
  rotateYToString,
  rotateZToString,
  rotate3dToString,
  scaleToString,
  scaleXToString,
  scaleYToString,
  scaleZToString,
  scale3dToString,
  skewToString,
  skewXToString,
  skewYToString,
  translateToString,
  translateXToString,
  translateYToString,
  translateZToString,
  translate3dToString,
} from './properties/index'
import { DeepRequired } from '../utils/index'

interface InputTransform {
  type: keyof TransformProps
  value: any
}

export const defaultTransformOptions: DeepRequired<GenerateTransformParams> = {
  units: {
    perspective: 'px',
    rotate: 'deg',
    skew: 'deg',
    translate: {
      xy: '%',
      z: 'px',
    },
  },
}

const flattenDeep = (array: any[]): Array<InputTransform> =>
  array.reduce((acc, v) => (Array.isArray(v) ? acc.concat(flattenDeep(v)) : acc.concat(v)), [])

const mapValues = (transform: InputTransform, units: DeepRequired<GenerateTransformParams>['units']): string => {
  switch (transform.type) {
    case 'matrix':
      return addFunctionMarkup(transform.type, matrixToString(transform.value))
    case 'matrix3d':
      return addFunctionMarkup(transform.type, matrix3dToString(transform.value))
    case 'perspective':
      return addFunctionMarkup(transform.type, perspectiveToString(transform.value, units.perspective))
    case 'rotate':
      return addFunctionMarkup(transform.type, rotateToString(transform.value, units.rotate))
    case 'rotateX':
      return addFunctionMarkup(transform.type, rotateXToString(transform.value, units.rotate))
    case 'rotateY':
      return addFunctionMarkup(transform.type, rotateYToString(transform.value, units.rotate))
    case 'rotateZ':
      return addFunctionMarkup(transform.type, rotateZToString(transform.value, units.rotate))
    case 'rotate3d':
      return addFunctionMarkup(transform.type, rotate3dToString(transform.value, units.rotate))
    case 'scale':
      return addFunctionMarkup(transform.type, scaleToString(transform.value))
    case 'scaleX':
      return addFunctionMarkup(transform.type, scaleXToString(transform.value))
    case 'scaleY':
      return addFunctionMarkup(transform.type, scaleYToString(transform.value))
    case 'scaleZ':
      return addFunctionMarkup(transform.type, scaleZToString(transform.value))
    case 'scale3d':
      return addFunctionMarkup(transform.type, scale3dToString(transform.value))
    case 'skew':
      return addFunctionMarkup(transform.type, skewToString(transform.value, units.skew))
    case 'skewX':
      return addFunctionMarkup(transform.type, skewXToString(transform.value, units.skew))
    case 'skewY':
      return addFunctionMarkup(transform.type, skewYToString(transform.value, units.skew))
    case 'translate':
      return addFunctionMarkup(transform.type, translateToString(transform.value, units.translate))
    case 'translateX':
      return addFunctionMarkup(transform.type, translateXToString(transform.value, units.translate))
    case 'translateY':
      return addFunctionMarkup(transform.type, translateYToString(transform.value, units.translate))
    case 'translateZ':
      return addFunctionMarkup(transform.type, translateZToString(transform.value, units.translate))
    case 'translate3d':
      return addFunctionMarkup(transform.type, translate3dToString(transform.value, units.translate))
    default:
      return ''
  }
}

/**
 * Generates the transform function.
 * The transform function can be used to easily create transforms in a parametrized fashion.
 */
export const generateTransform: GenerateTransform = (options?: GenerateTransformParams): Transform => {
  const _units = {
    ...defaultTransformOptions.units,
    ...(options && options.units),
    translate: { ...defaultTransformOptions.units.translate, ...(options && options.units && options.units.translate) },
  }

  const transform = (transforms: TransformProps | TransformProps[]) => {
    const transformsArray = !Array.isArray(transforms) ? [transforms] : transforms
    const transformsFlat = flattenDeep(
      transformsArray.map(t => Object.entries(t).map(([transform, value]) => ({ type: transform, value })))
    )
    return transformsFlat.map(v => mapValues(v, _units)).join(' ')
  }
  return transform as Transform
}

export { GenerateTransformParams, Transform, GenerateTransform }
