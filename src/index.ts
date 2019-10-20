import { breakpoints, breakpointDefaults, BreakpointsParams } from './breakpoints'
import { color, ColorInput } from './color'
import { spacing, SpacingParams } from './spacing'
import { transition, TransitionCreationParams } from './transition'

interface GenerateStylesParams {
  palette?: {
    [key: string]: ColorInput
  }
  breakpoint?: BreakpointsParams
  spacing?: SpacingParams
  transition?: TransitionCreationParams
}

export const generateStyleUtils = (options?: GenerateStylesParams) => ({
  palette:
    options && options.palette && Object.fromEntries(Object.entries(options.palette).map(([k, v]) => [k, color(v)])),
  breakpoint: breakpoints(options && options.breakpoint),
  spacing: spacing(options && options.spacing),
  transition: transition(options && options.transition),
})
