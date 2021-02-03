# Style-genie 🧞‍♂️🧞‍♀️

A collection of style utilities for css-in-js frameworks.

Made with [typescript](https://github.com/microsoft/TypeScript) and well documented with support for in-editor insights and tooltips.

[Documentation](https://jcquintas.gitbook.io/style-genie/)

## Badges

<a href="https://www.npmjs.com/package/style-genie">
  <img src="https://badgen.net/npm/v/style-genie?icon=npm&label=style-genie" alt="types included">
</a>
<a href="https://github.com/microsoft/TypeScript">
  <img src="https://badgen.net/npm/types/style-genie?icon=typescript&label" alt="latest version">
</a>
<a href="https://www.codefactor.io/repository/github/jcquintas/style-genie">
  <img src="https://www.codefactor.io/repository/github/jcquintas/style-genie/badge" alt="code quality">
</a>
<a href="https://opensource.org/licenses/MIT">
  <img src="https://badgen.net/npm/license/style-genie" alt="license">
</a>
<a href="https://snyk.io/test/github/JCQuintas/style-genie?targetFile=package.json">
  <img src="https://snyk.io/test/github/JCQuintas/style-genie/badge.svg?targetFile=package.json" alt="known vulnerabilities" >
</a>

## Why?

The idea behind this project is to collect and improve on commonly used and often wanted style utilities. It is heavily influenced by the utilities [material-ui](https://github.com/mui-org/material-ui) have in their theme object, but without all the burden that comes with it.

**Style-genie**'s modularized architecture allows you to pick only the functionalities you want and shape them however you like in your app.

It is also meant to have as few dependencies as possible, currently we depend on `0` external non-dev dependencies.

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
  generateTransform,
  generateTransition
} from 'style-genie'
```
<!-- prettier-ignore-end -->

## Utilities

The currently offered utilities are:

- **[Breakpoint](./src/breakpoint/readme.md)**: Media query strings generated based on customizable values.
- **[Color](./src/color/readme.md)**: Gives easy access to custom colors and the ability to manipulate them.
- **[Spacing](./src/spacing/readme.md)**: Maintain a coherent spacing calculation throughout the app.
- **[Transform](./src/transform/readme.md)**: Generate multiple transform function strings easily without the need of template strings.
- **[Transition](./src/transition/readme.md)**: Generate transition strings without repetitive typing.
