# Breakpoint

Media query strings generated based on customizable values.

Default values are the most commonly used breakpoints, but they can be configured as you like.

## Usage

```javascript
import { generateBreakpoint } from 'style-genie'

const breakpoint = generateBreakpoint()

breakpoint.up.md
// '@media (min-width: 960px)'
breakpoint.down.md
// '@media (max-width: 959.95px)'
breakpoint.only.md
// '@media (min-width: 960px) and (max-width: 1279.95px)'
breakpoint.between('md', 'xl')
// '@media (min-width: 960px) and (max-width: 1919.95px)'
```

## Parameters

The _generateBreakpoint_ function accepts only one _options_ parameter, which can have the following properties.

| property    | type                        | description              |
| ----------- | --------------------------- | ------------------------ |
| breakpoints | `{ [key: string]: number }` | custom breakpoint values |

### Default options

```javascript
{
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}
```

### Custom breakpoints

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
