# Breakpoint

Media query strings generated based on customizable values.

Default values are the most commonly used breakpoints, but they can be configured as you like.

## Usage

```javascript
import { generateBreakpoint } from 'style-genie'

const breakpoint = generateBreakpoint()

breakpoint.up.md // '@media (min-width: 960px)'
```

## Parameters

The _generateBreakpoint_ function accepts only one _options_ parameter, which can have the following properties.

| property    | type                                     | description              | default                                           |
| ----------- | ---------------------------------------- | ------------------------ | ------------------------------------------------- |
| breakpoints | `{ [key: string]: number } OR undefined` | custom breakpoint values | `{ xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 }` |

## Custom breakpoints

You can pass in custom breakpoints to the _generateBreakpoint_ function. It is recommended to have one breakpoint for `0` and no repeating number.

```javascript
const breakpoint = generateBreakpoint({
  breakpoints: {
    zero: 0,
    phone: 420,
    tablet: 780,
    desktop: 1440,
  },
})
```