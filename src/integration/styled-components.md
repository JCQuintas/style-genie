# Styled-Components Integration

[Styled-Components](https://www.styled-components.com) is a well known library to stylize components and works very well when augmented with style-genie.

## Setup

Here we will try to show the basics of how to get a theme going in styled-components.

> **Note:** These are just examples, you can adapt them to work with your setup in however way you like and there is no 'single way' to work with style-genie.

You will want to have a `theme` object so you can eventually pass it into `ThemeProvider`

```javascript
const theme = {
  palette: {
    primary: generateColor('hsl(200, 50%, 70%)'),
    background: generateColor('hsl(180, 50%, 10%)'),
    text: generateColor('#d8d8d8'),
  },
  breakpoint: generateBreakpoint(),
  spacing: generateSpacing(),
  transition: generateTransition(),
}
```

The `ThemeProvider` will simply accept the theme object we created above.

```jsx
<ThemeProvider theme={theme}>
  <YourApp />
</ThemeProvider>
```

Which will allow you to use theme inside any styled-component prop.

```jsx
const StyledComponent = styled.div`
  background: ${({ theme }) => theme.palette.background.color};
  padding: ${({ theme }) => theme.spacing(1)};
  transition: ${({ theme }) => theme.transition(['padding'])};

  /* ~Tablet and up */
  ${({ theme }) => theme.breakpoint.up.sm} {
    padding: ${({ theme }) => theme.spacing(4)};
  }
`
```

## Typescript

If using typescript, you might want to create a [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) to help you in auto-completion inside components and such.

You can read `styled-component`'s own [step-by-step here](https://www.styled-components.com/docs/api#create-a-declarations-file) if you want. But it is basically declaring the shape of your `theme` object in a `.d.ts` file.

`Style-genie` exports all the types you will need for this. Most types are static, except `Breakpoint` which is generic and can accept an `object` type of signature `{ [key: string]: number }` in case you are using custom breakpoints.

```typescript
import 'styled-components'
import { Color, Breakpoint, Spacing, Transition } from 'style-genie'

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      primary: Color
      background: Color
      text: Color
    }
    breakpoint: Breakpoint
    spacing: Spacing
    transition: Transition
  }
}
```

And that is it. You shall have auto-complete and in-code tips when using the theme prop inside any styled component.

```typescript
const StyledComponent = styled.div`
  background: ${
    ({ theme }) => theme.palette. // now suggests 'primary' | 'background' | 'text'
  };
`
```
