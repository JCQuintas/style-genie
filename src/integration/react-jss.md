# React-JSS Integration

[React-JSS](https://cssinjs.org/react-jss) integrates one of the most popular css-in-js libraries, [JSS](https://cssinjs.org/), with React.

## Setup

Here we will try to show the basics of how to get a theme going in react-jss.

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

Which will make the `theme` available throughout your app. But before that we need to create the styles using `createUseStyles`.

```jsx
const useStyles = createUseStyles(theme => ({
  component: {
    background: theme.palette.background.color,
    padding: theme.spacing(1),
    transition: theme.transition(['padding']),

    [`${theme.breakpoint.up.sm}`]: {
      padding: theme.spacing(4),
    },
  },
}))
`
```

We can then declare the component that will receive the styles. We call `useTheme` to get the current instance of the theme, then we pass it to the `useStyles` function we created above and then we are finally able to use the class inside the component.

```jsx
const ReactJSSComponent = ({ ...props }) => {
  const theme = useTheme()
  const classes = useStyles({ ...props, theme })
  return <div {...props} className={classes.component} />
}
```

## Typescript

To use typescript with react0jss you will want to create the typings for your theme and export it, or make it globally available if you want.

`Style-genie` exports all the types you will need for this. Most types are static, except `Breakpoint` which is generic and can accept an `object` type of signature `{ [key: string]: number }` in case you are using custom breakpoints.

```typescript
import { Color, Breakpoint, Spacing, Transition } from 'style-genie'

export interface CustomTheme {
  palette: {
    primary: Color
    background: Color
    text: Color
  }
  breakpoint: Breakpoint
  spacing: Spacing
  transition: Transition
}
```

You can, alternatively, generate the types from the `theme` object as follows.

```typescript
export type CustomTheme = typeof theme
```

Then you have to pass the `CustomTheme` type into the `createUseStyles` function.

```typescript
const useStyles = createUseStyles<CustomTheme, 'component'>(theme => ({
  component: {
    background: theme.palette. // now suggests 'primary' | 'background' | 'text'
  },
}))
```
