# Spacing

Maintain a coherent spacing calculation throughout the app.

It is important to keep a regular spacing method in order to convey harmony to the end user. The spacing function can be used to fulfill that.

## Usage

```javascript
import { generateSpacing } from 'style-genie'

const spacing = generateSpacing()

spacing()
// '8px'
spacing(-1)
// '-8px'
spacing(0)
// '0px'
```

## Parameters

The _generateSpacing_ function accepts only one _options_ parameter used to set the default values. It can have the following properties.

| property  | type     | description                                           |
| --------- | -------- | ----------------------------------------------------- |
| increment | `number` | the amount that will be multiplied by the input value |
| base      | `number` | the base number of the calculation                    |
| unit      | `string` | the unit to be used when returning strings            |

### Default options

```javascript
{
  increment: 8,
  base: 0,
  unit: 'px',
}
```

### Custom defaults

You can define you own defaults but passing the _options_ object into the _generate_ function.

**Note:** the base value is always added to the final value with the formula `base + (input * increment)<unit>`, to bypass that you can input `-0` as the spacing, and the function will return `0<unit>`.

```javascript
const spacing = generateSpacing({
  increment: 0.125,
  base: 1,
  unit: 'em',
})

spacing()
// '1.125em'
spacing(-1)
// '0.875em'
spacing(0)
// '1em'
spacing(-0)
// '0em'
```

## Spacing function

The _spacing_ is the result of the generator function. You have to call it to get an actual distance unit string as output and it can be used throughout your app.

If called without parameters it will return the default values as shown above, but it has 6 valid signatures.

#### Calculate the default value and returns it as a number.

```typescript
(asNumber: true): number

spacing(true) // 8
```

#### Calculates the value based on the spacing and returns it as a number.

```typescript
(multiplier: number, asNumber: true): number

spacing(2, true) // 16
```

#### Calculates the value based on the spacing and returns it as a string.

```typescript
(multiplier?: number, asNumber?: false): string

spacing(3) // '24px'
spacing(3, false) // '24px'
```

#### Calculates the value based on vertical and horizontal and returns it as a string.

```typescript
(vertical: number, horizontal: number): string

spacing(4, 5) // '32px 40px'
```

#### Calculates the value based on top, horizontal and bottom and returns it as a string.

```typescript
(top: number, horizontal: number, bottom: number): string

spacing(6, 7, 8) // '48px 56px 64px'
```

#### Calculates the value based on top, right, bottom and left and returns it as a string.

```typescript
(top: number, right: number, bottom: number, left: number): string

spacing(9, 10, 11, 12) // '72px 80px 88px 96px'
```
