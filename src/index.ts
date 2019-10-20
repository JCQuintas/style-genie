import { breakpoint, defaultBreakpointParams, BreakpointParams } from './breakpoint'
import { color, ColorInput } from './color'
import { spacing, SpacingParams } from './spacing'
import { transition, TransitionParams } from './transition'
import { FilterProperties, PickPalette } from 'utils'

interface GenerateStylesParams<T> {
  palette?: { [K in keyof PickPalette<T>]: ColorInput }
  breakpoint?: BreakpointParams<T[FilterProperties<T, 'breakpoint'>]>
  spacing?: SpacingParams
  transition?: TransitionParams
}

export const generateStyleUtils = <O extends GenerateStylesParams<O>>(options?: O) => ({
  palette:
    options &&
    options.palette &&
    Object.fromEntries(Object.entries(options.palette).map(([k, v]) => [k, color(v as ColorInput)])),
  breakpoint: breakpoint(options && options.breakpoint),
  spacing: spacing(options && options.spacing),
  transition: transition(options && options.transition),
})

generateStyleUtils({
  palette: {
    blue: 'rgb(0,0,255)',
  },
  breakpoint: {
    entries: {
      xd: 999,
      ass: 101,
    },
  },
}).palette

export {
  breakpoint,
  defaultBreakpointParams,
  BreakpointParams,
  color,
  ColorInput,
  spacing,
  SpacingParams,
  transition,
  TransitionParams,
}
