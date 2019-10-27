# Style-genie 🧞‍♂️🧞‍♀️

A collection of style utilities for css-in-js frameworks.

## Why?

The idea behind this project is to collect and improve on commonly used and often wanted style utilities. It is heavily influenced by the utilities [material-ui](https://github.com/mui-org/material-ui) have in their theme object.

## Utilities

The currently offered utilities are:

- **[Breakpoint](./src/breakpoint/readme.md)**: Media query strings generated based on customizable values.
- **[Spacing](./src/spacing/readme.md)**: Maintain a coherent spacing calculation throughout the app.
- **[Color](./src/color/readme.md)**: Gives easy access to custom colors and the ability to manipulate them.
- **[Transition](./src/transition/readme.md)**: Generate transition strings without repetitive typing.

## Getting started

```bash
npm install style-genie
```

```javascript
import { generateBreakpoint, generateColor, generateSpacing, generateTransition } from 'style-genie'
```
