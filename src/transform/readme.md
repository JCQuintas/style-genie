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
// custom unit override for this call
transform({ translate: 10 }, { units: { transform: { xy: 'em' } } }) // 'translate(10em)'
// multiple transforms
transform({ translate: 10, scale: 1.5 }) // 'translate(10%) scale(1.5)'
// duplicate transforms
transform([{ translate: 10 }, { translate: 10 }]) // 'translate(10%) translate(10%)'
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

#### Matrix

The `matrix` function has two possible signatures.

```javascript
// MatrixObject
transform({
  matrix: {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    tx: 0,
    ty: 0,
  },
})

// MatrixArray
transform({ matrix: [0, 0, 0, 0, 0, 0] })
```

#### Matrix3d

The `matrix3d` function is similar to the regular matrix function, and also takes two signatures.

```javascript
// Matrix3dObject
transform({
  matrix3d: {
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0,
    b1: 0,
    b2: 0,
    b3: 0,
    b4: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    d1: 0,
    d2: 0,
    d3: 0,
    d4: 0,
  },
})

// Matrix3dArray
transform({ matrix: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })
```
