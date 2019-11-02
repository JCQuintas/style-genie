# Color

Gives easy access to custom colors and the ability to manipulate them.

It `decorates` a given color into an object that allows for easy manipulation of the color's proprieties. A format function is also provided to change the output to different color spaces when needed.

## Usage

<!-- prettier-ignore-start -->
```javascript
import { generateColor } from 'style-genie'

// default format 'rgba'
const white = generateColor('#fff')

console.log(white)       // { color: 'rgba(255, 255, 255, 1)', ... }
console.log(white.color) // 'rgba(255, 255, 255, 1)'
console.log('' + white)  // 'rgba(255, 255, 255, 1)'
console.log(`${white}`)  // 'rgba(255, 255, 255, 1)'

// explicit format
const black = generateColor('#000', 'hsl')

console.log(black)       // { color: 'hsl(0, 0%, 0%)' , ... }
```
<!-- prettier-ignore-end -->

> **Note:** Keep in mind that we provide a `toString` function to the color object. This means that, when casting the object to string, it will output the value of the `color` property, as to remove the need to type `.color` for every color. This might have consequences depending on your setup, ex: `JSON.stringify` will still consider the color an object instead of a string.

## Parameters

The _generateColor_ function accepts up to two parameter used to set the default values.

| property | type                                                      | description                            |
| -------- | --------------------------------------------------------- | -------------------------------------- |
| color    | `string` \| `number` \| `number[]`                        | the base color to be decorated         |
| format   | **`'rgba'`** \| `'rgb'` \| `'hex'` \| `'hsl'` \| `'hsla'` | the default output format of the color |

### Formats

The `color` property can accept a various amount of input format. Here they are listed ordered by categories.

- **Number:** Either a single `number` or a number array of `[number, number, number]`. The number must be a value in the RGB, from `0` to `255`.
- **Hex:** Can be any type of hex color, short, long or with alpha. `'#000'`, `'#000000'` or `'#000000FF'`.
- **RGB:** Regular `rgb` or `rgba` color format. `'rgb(0, 0, 0)'` or `'rgba(0, 0, 0, 1)'`.
- **HSL:** The `hsl` or `hsla` color notation. `'hsl(0, 0%, 0%)'` or `'hsla(0, 0%, 0%, 1)'`.

## Color Object

The color object is the result of the generator function. Apart from the `color` property shown above, there are a two other.

```typescript
{
  color: string,
  manipulate: Function,
  format: Function,
}
```

## Manipulate

This function allows for manipulation of the color properties in the `HSLA` model, `hue`, `saturation`, `lightness` and `alpha`. It accepts a single object with one or more of the following properties.

| parameters | type     | description                                              | value          |
| ---------- | -------- | -------------------------------------------------------- | -------------- |
| hueShift   | `number` | shifts the **hue** by the given amount                   | `any`          |
| illuminate | `number` | changes the **luminosity** value by the given percentage | `-1.0` - `1.0` |
| saturate   | `number` | changes the **saturation** value by the given percentage | `-1.0` - `1.0` |
| opacity    | `number` | sets the current opacity to the given number             | `0.0` - `1.0`  |

### Usage

<!-- prettier-ignore-start -->
```javascript
const color = generateColor('hsl(0, 100%, 30%)', 'hsla')

color.manipulate({ hueShift: 80 })    // 'hsla(80, 100%, 30%, 1)'
color.manipulate({ illuminate: 0.5 }) // 'hsla(0, 100%, 45%, 1)'
color.manipulate({ saturate: -0.3 })  // 'hsla(0, 70%, 30%, 1)'
color.manipulate({ opacity: 0.1 })    // 'hsla(0, 70%, 30%, 0.1)'
```
<!-- prettier-ignore-end -->

## Format

Allows the formating of the output color. This might be useful when having to input specific formats for external libraries. It has only one parameter which is the format the output should conform to.

| property | type                                                  | description                |
| -------- | ----------------------------------------------------- | -------------------------- |
| format   | `'rgba'` \| `'rgb'` \| `'hex'` \| `'hsl'` \| `'hsla'` | output format of the color |

### Usage

<!-- prettier-ignore-start -->
```javascript
const black = generateColor('rgb(0, 0, 0)')

white.format('hex')    // '#000000'
white.format('rgb')    // 'rgb(0, 0, 0)'
white.format('rgba')   // 'rgba(0, 0, 0, 1)'
white.format('hsl')    // 'hsl(0, 0%, 0%)'
white.format('hsla')   // 'hsla(0, 0%, 0%, 1)'
```
<!-- prettier-ignore-end -->
