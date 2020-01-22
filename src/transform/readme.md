# Transform

Generate transform strings easily without the need of template strings.

This will give you more flexibility when creating or updating transform functions all over your app. It has sensible defaults, but any length value can be overridden either in the generator function or the actual value declaration.

## Usage

```javascript
import { generateTransform } from 'style-genie'

const transform = generateTransform()

// default usage
transform({ translate: 10 }) // 'translate(10%)'
transform({ translate: [10, 20] }) // 'translate(10%, 20%)'
transform({ translate: { x: 10, y: 20 } }) // 'translate(10%, 20%)'
transform({ translate: '10em' }) // 'translate(10em)'

// multiple transforms
transform({
  translate: 10,
  scale: 1.5,
}) // 'translate(10%) scale(1.5)'

// duplicate transforms
transform([
  {
    translate: 10,
  },
  {
    translate: 10,
  },
]) // 'translate(10%) translate(10%)'

// custom unit override for this call
transform(
  {
    translate: 10,
  },
  {
    units: { transform: { xy: 'em' } },
  }
) // 'translate(10em)'
```

## Parameters

The _generateTransform_ function accepts only one _options_ parameter used to set the default values. It can have the following properties.

| property           | type     | description                                  |
| ------------------ | -------- | -------------------------------------------- |
| units              | `object` | holds properties to change the default units |
| units.perspective  | `string` | changes default unit for `perspective`       |
| units.rotate       | `string` | changes default unit for `rotate`            |
| units.skew         | `string` | changes default unit for `skew`              |
| units.translate    | `object` | translate xy can have different props than z |
| units.translate.xy | `string` | changes default unit for `translateX/Y`      |
| units.translate.z  | `string` | change default unit for `translateZ`         |

### Default options

```javascript
{
  units: {
    perspective: 'px', // Affects the perspective() function
    rotate: 'deg', // Affects rotate, rotateX/Y/Z and rotate3d
    skew: 'deg', // Affects skew, skewX/Y
    translate: {
      xy: '%', // Affects translate, translateX/Y and translate3d
      z: 'px', // Affects translateZ and translate3d
    }
  }
}
```

> **Note:** The functions matrix, matrix3d, scale, scaleX, scaleY, scaleZ, scale3d do not user units and thus can not be overridden.

## Transform function

The _transform_ is the result of the generator function. You have to call it to get an actual transform string as output and it can be used throughout your app.

| parameters | type                   | description                                                           |
| ---------- | ---------------------- | --------------------------------------------------------------------- |
| transforms | `object` \| `object[]` | can have any of the transform functions as properties                 |
| overrides  | `object`               | `options` object that will override units for this function call only |

The `transforms` parameter can have one or more of the following properties.

| parameters    | description                                               |
| ------------- | --------------------------------------------------------- |
| `matrix`      | Describes a homogeneous 2D transformation matrix          |
| `matrix3d`    | Describes a 3D transformation as a 4×4 homogeneous matrix |
| `perspective` | Sets the distance between the user and the z=0 plane      |
| `rotate`      | Rotates an element around a fixed point on the 2D plane   |
| `rotateX`     | Rotates an element around the horizontal axis             |
| `rotateY`     | Rotates an element around the vertical axis               |
| `rotateZ`     | Rotates an element around the z-axis                      |
| `rotate3d`    | Rotates an element around a fixed axis in 3D space        |
| `scale`       | Scales an element up or down on the 2D plane              |
| `scaleX`      | Scales an element up or down horizontally                 |
| `scaleY`      | Scales an element up or down vertically                   |
| `scaleZ`      | Scales an element up or down along the z-axis             |
| `scale3d`     | Scales an element up or down in 3D space                  |
| `skew`        | Skews an element on the 2D plane                          |
| `skewX`       | Skews an element in the horizontal direction              |
| `skewY`       | Skews an element in the vertical direction                |
| `translate`   | Translates an element on the 2D plane                     |
| `translateX`  | Translates an element horizontally                        |
| `translateY`  | Translates an element vertically                          |
| `translateZ`  | Translates an element along the z-axis                    |
| `translate3d` | Translates an element in 3D space                         |

### Matrix

The `matrix` property describes a homogeneous 2D transformation matrix.

<!-- prettier-ignore-start -->
```typescript
interface MatrixObject {
  a: number; b: number;
  c: number; d: number;
  tx: number; ty: number;
}

type MatrixArray = [
  number, number,
  number, number,
  number, number
]

// Usage
transform({ matrix: MatrixObject | MatrixArray })
```
<!-- prettier-ignore-end -->

### Matrix3d

Similar to matrix, the `matrix3d` property describes a 3D transformation as a 4×4 homogeneous matrix.

<!-- prettier-ignore-start -->
```typescript
interface Matrix3dObject {
  a1: number; a2: number; a3: number; a4: number;
  b1: number; b2: number; b3: number; b4: number;
  c1: number; c2: number; c3: number; c4: number;
  d1: number; d2: number; d3: number; d4: number;
}

type Matrix3dArray = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
]

// Usage
transform({ matrix3d: Matrix3dObject | Matrix3dArray })
```
<!-- prettier-ignore-end -->

### Perspective

Although not commonly used, the `perspective` property sets the distance between the user and the z=0 plane.

```typescript
// Usage
transform({ perspective: number | string })
```

### Rotate/X/Y/Z

The `rotate` property allows for the rotation of an element around a fixed point on the 2D plane. The some of the other rotation properties have the same signature, but affect only a single axis.
The `rotateX` property describes the rotation of an element around the horizontal axis, `rotateY` will affect the vertical axis, while `rotateZ` will work only on the z-axis.

```typescript
// Usage
transform({ rotate: number | string })
transform({ rotateX: number | string })
transform({ rotateY: number | string })
transform({ rotateZ: number | string })
```

### Rotate3d

The property `rotate3d` will allow for the rotation around a fixed axis in 3D space

```typescript
interface Rotate3dObject {
  x: number
  y: number
  z: number
  a: number | string
}

type Rotate3dArray = [number, number, number, number | string]

// Usage
transform({ rotate3d: Rotate3dObject | Rotate3dArray | string })
```

### Scale

Using the `Scale` property allows for scaling an element up or down on the 2D plane

```typescript
interface ScaleObject {
  sx: number
  sy?: number
}

type ScaleArray = [number, number?]

// Usage
transform({ scale: ScaleObject | ScaleArray | number })
```

### ScaleX/Y/Z

Similar to the scale property, `scaleX`, `scaleY` and `scaleZ` will only have effect on their respective axes.

```typescript
// Usage
transform({ scaleX: number })
transform({ scaleY: number })
transform({ scaleZ: number })
```

### Scale3d

When dealing with scaling the the 3D space, the `scale3d` property will allow you to change the scaling on all dimensions at once.

```typescript
interface Scale3dObject {
  sx: number
  sy: number
  sz: number
}

type Scale3dArray = [number, number, number]

// Usage
transform({ scale3d: Scale3dObject | Scale3dArray })
```

### Skew

The property `skew` can be used to skew an element on the 2D plane.

```typescript
interface SkewObject {
  ax: number | string
  ay?: number | string
}

type SkewArray = [number | string, (number | string)?]

// Usage
transform({ skew: SkewObject | SkewArray | number | string })
```

### SkewX/Y

The simpler `skewX` and `skewY` are a subset of the skew function and will skew an element in the horizontal or vertical direction, respectively.

```typescript
// Usage
transform({ skewX: number | string })
transform({ skewY: number | string })
```

### Translate

The `translate` property allows the user to move an element on the 2D plane.

```typescript
interface TranslateObject {
  tx: number | string
  ty?: number | string
}

type TranslateArray = [number | string, (number | string)?]

// Usage
transform({ translate: TranslateObject | TranslateArray | number | string })
```

### TranslateX/Y/Z

The axis locked translates, `translateX`, `translateY`, `translateZ` allow for an element to be moved on their specific planes.

```typescript
// Usage
transform({ translateX: number | string })
transform({ translateY: number | string })
transform({ translateZ: number | string })
```

### Translate3d

A junction of the previous translate functions, the `translate3d` property is used to translate an element in all planes at once.

```typescript
interface Translate3dObject {
  tx: number | string
  ty: number | string
  tz: number | string
}

type Translate3dArray = [number | string, number | string, number | string]

// Usage
transform({ translate3d: Translate3dObject | Translate3dArray | string })
```
