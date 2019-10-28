# Breakpoint

Media query strings generated based on customizable values.

Default values are the most commonly used breakpoints, but it can be configured as you like.

## Usage

```javascript
import { generateBreakpoint } from 'style-genie'

const breakpoint = generateBreakpoint()

breakpoint.up.md // '@media (min-width: 960px)'
```

## Parameters

The _generateBreakpoint_ function accepts only one options parameter, which can have the following properties.

| property    | type                        | description              |
| ----------- | --------------------------- | ------------------------ |
| breakpoints | `{ [key: string]: number }` | custom breakpoint values |

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
