# Style-genie 🧞‍♂️🧞‍♀️

A collection of style utilities for css-in-js frameworks.

Made with [typescript](https://github.com/microsoft/TypeScript), which provides support for in-editor documentation.

## Why?

The idea behind this project is to collect and improve on commonly used and often wanted style utilities. It is heavily influenced by the utilities [material-ui](https://github.com/mui-org/material-ui) have in their theme object, but without all the burden that comes with it.

**Style-genie**'s modularized architecture allows you to pick only the functionalities you want and shape them however you like in your app.

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

<!-- prettier-ignore-start -->
```javascript
import {
  generateBreakpoint,
  generateColor,
  generateSpacing,
  generateTransition
} from 'style-genie'
```
<!-- prettier-ignore-end -->
