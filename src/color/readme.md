# Color

Gives easy access to custom colors and the ability to manipulate them.

It `decorates` a given color into an object that allows for easy manipulation of the color's proprieties. A format function is also provided to change the output to different color spaces when needed.

## Usage

```javascript
import { generateColor } from 'style-genie'

const white = generateColor('#fff')

console.log(white) // { color: 'rgba(255, 255, 255)', ... }
console.log(white.color) // 'rgba(255, 255, 255)'
console.log('' + white) // 'rgba(255, 255, 255)'
console.log(`${white}`) // 'rgba(255, 255, 255)'
```

> **Note:** Keep in mind that we provide a `toString` function to the color object. This means that, when casting the object to string, it will output the value of the `color` property, as remove the need to type `.color` for every color. This might have consequences depending on your setup, ex: `JSON.stringify` will still consider the color an object instead of a string.
