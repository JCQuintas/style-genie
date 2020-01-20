import {
  Matrix3dProp,
  MatrixProp,
  PerspectiveProp,
  Rotate3dProp,
  RotateProp,
  RotateXProp,
  RotateYProp,
  RotateZProp,
  Scale3dProp,
  ScaleProp,
  SkewProp,
  Translate3dProp,
  TranslateProp,
  TranslateZProp,
  ScaleXProp,
  ScaleYProp,
  ScaleZProp,
  SkewXProp,
  SkewYProp,
  TranslateXProp,
  TranslateYProp,
} from './properties/index'
import { TransformLengthUnit, TransformAngleUnit, TransformPercentageUnit } from './utils/index'

export interface TransformProps {
  /**
   * Describes a homogeneous 2D transformation matrix.
   */
  matrix3d?: Matrix3dProp
  /**
   * Describes a 3D transformation as a 4×4 homogeneous matrix.
   */
  matrix?: MatrixProp
  /**
   * Sets the distance between the user and the z=0 plane.
   */
  perspective?: PerspectiveProp
  /**
   * Rotates an element around a fixed axis in 3D space.
   */
  rotate3d?: Rotate3dProp
  /**
   * Rotates an element around a fixed point on the 2D plane.
   */
  rotate?: RotateProp
  /**
   * Rotates an element around the horizontal axis.
   */
  rotateX?: RotateXProp
  /**
   * Rotates an element around the vertical axis.
   */
  rotateY?: RotateYProp
  /**
   * Rotates an element around the z-axis.
   */
  rotateZ?: RotateZProp
  /**
   * Scales an element up or down in 3D space.
   */
  scale3d?: Scale3dProp
  /**
   * Scales an element up or down on the 2D plane.
   */
  scale?: ScaleProp
  /**
   * Scales an element up or down horizontally.
   */
  scaleX?: ScaleXProp
  /**
   * Scales an element up or down vertically.
   */
  scaleY?: ScaleYProp
  /**
   * Scales an element up or down along the z-axis.
   */
  scaleZ?: ScaleZProp
  /**
   * Skews an element on the 2D plane.
   */
  skew?: SkewProp
  /**
   * Skews an element in the horizontal direction.
   */
  skewX?: SkewXProp
  /**
   * Skews an element in the vertical direction.
   */
  skewY?: SkewYProp
  /**
   * Translates an element in 3D space.
   */
  translate3d?: Translate3dProp
  /**
   * Translates an element on the 2D plane.
   */
  translate?: TranslateProp
  /**
   * Translates an element horizontally.
   */
  translateX?: TranslateXProp
  /**
   * Translates an element vertically.
   */
  translateY?: TranslateYProp
  /**
   * Translates an element along the z-axis.
   */
  translateZ?: TranslateZProp
}

/**
 * The typing for the __params__ of the `generateTransform` function.
 */
export interface GenerateTransformParams {
  /**
   * `units` is an object that defines the units to be used when returning strings
   * for each configurable transform type.
   */
  units?: {
    /**
     * `perspective` allows you to change the default unit.
     * - Default: `'px'`
     *
     * ```typescript
     * 'px' | 'em' | 'rem' | 'vh' | 'vw' | 'vmax' | 'vmin'
     * 'pt' | 'ch' | 'cm' | 'ex' | 'in' | 'mm' | 'pc' | string
     * ```
     */
    perspective?: TransformLengthUnit
    /**
     * `rotate` allows you to change the default unit for all `rotate` transforms.
     * - Default: `'deg'`
     *
     * ```typescript
     * 'deg' | 'grad' | 'rad' | 'turn'
     * ```
     */
    rotate?: TransformAngleUnit
    /**
     * `skew` allows you to change the default unit for all `skew` transforms.
     * - Default: `'deg'`
     *
     * ```typescript
     * 'deg' | 'grad' | 'rad' | 'turn'
     * ```
     */
    skew?: TransformAngleUnit
    /**
     * `translate` is an object that allows you to change the default units for all `translate` transforms.
     */
    translate?: {
      /**
       * `xy` allows you to change the default unit when translating in the X or Y axis.
       * - Default: `'%'`
       *
       * ```typescript
       * '%' | 'px' | 'em' | 'rem' | 'vh' | 'vw' | 'vmax' | 'vmin'
       * 'pt' | 'ch' | 'cm' | 'ex' | 'in' | 'mm' | 'pc' | string
       * ```
       */
      xy?: TransformLengthUnit | TransformPercentageUnit
      /**
       * `z` allows you to change the default unit when translating in the Z axis.
       * - Default: `'px'`
       *
       * ```typescript
       * 'px' | 'em' | 'rem' | 'vh' | 'vw' | 'vmax' | 'vmin'
       * 'pt' | 'ch' | 'cm' | 'ex' | 'in' | 'mm' | 'pc' | string
       * ```
       */
      z?: TransformLengthUnit
    }
  }
}

/**
 * The typing for the __return__ value of the `generateTransform` function.
 */
export interface Transform {
  /**
   * Builds the transform string, automatically joins two or more transforms
   * if more than one __transformProperty__ is given. You can use the array
   * to add more that one transform of the same type or to order them.
   *
   * @param transforms - __transforms__ is an object or array of objects with possible transform properties.
   * @param overrides - __overrides__ object to override any options just for this instance.
   * @returns a transform string `'translate(--px) rotate(--deg)'`
   */
  (transforms: TransformProps | TransformProps[], overrides?: GenerateTransformParams): string
}

/**
 * The typing for the `generateTransform` function.
 */
export interface GenerateTransform {
  /**
   * Generates the transform function.
   * The transform function can be used to easily create transforms in a parametrized fashion.
   *
   * @param options - __options__ object to initialize the function with.
   * @returns the transform function.
   */
  (options?: GenerateTransformParams): Transform
}
