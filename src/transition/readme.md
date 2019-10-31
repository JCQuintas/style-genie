# Transition

Generate transition strings without repetitive typing.

This function allows you to have a default timing function and duration over your entire app, while still allowing for customized values when needed.

## Usage

```javascript
import { generateTransition } from 'style-genie'

const transition = generateTransition()

transition() // 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
```

## Parameters

The _generateTransition_ function accepts only one _options_ parameter used to set the default values. It can have the following properties.

| property | type     | description                       |
| -------- | -------- | --------------------------------- |
| duration | `number` | the value in _ms_ of the duration |
| easing   | `string` | the transition timing function    |

### Default options

```javascript
{
  duration: 250,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
}
```

### Custom defaults

You can define you own defaults but passing the _options_ object into the _generate_ function.

```javascript
const transition = generateTransition({ duration: 1000, easing: 'ease-in' })

transition() // 'all 1000ms ease-in'
```

## Transition function

The _transition_ is the result of the generator function. You have to call it to get an actual transition string as output and it can be used throughout your app.

If called without parameters it will return the default values as shown above, but it can accept up to three parameters, `cssProperties`, `duration`, `easing`.

| parameters    | type                 | description                       |
| ------------- | -------------------- | --------------------------------- |
| cssProperties | `string OR string[]` | the css properties to be animated |
| duration      | `number`             | the value in _ms_ of the duration |
| easing        | `string`             | the transition timing function    |

### Custom overrides

You can override the default options in any call to the `transition` function. It will automatically joins two or more transitions if they are present.

```javascript
transition('color', 150, 'ease-out')
// 'color 150ms ease-out'
transition(['color', 'top'], 150, 'ease-out')
// 'color 150ms ease-out, top 150ms ease-out'
```

You may also input the timing function as the second parameter, doing so will use the default duration.

```javascript
transition('height', 'linear')
// 'height 250ms linear'
transition(['height', 'margin-left'], 'linear')
// 'height 250ms linear, margin-left 250ms linear'
```
