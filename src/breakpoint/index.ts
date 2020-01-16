import { GenerateBreakpoint, GenerateBreakpointParams, Breakpoint } from './index.types'

const defaultBreakpointOptions = {
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  unit: 'px',
  step: 5 / 100,
}

/**
 * Generate the breakpoints object.
 * The breakpoints object has media query strings generated based on the input object values.
 */
const generateBreakpoint: GenerateBreakpoint = (options?: GenerateBreakpointParams) => {
  // Sort breakpoints ascending by value
  const _breakpoints = Object.entries((options && options.breakpoints) || defaultBreakpointOptions.breakpoints).sort(
    ([_, a], [__, b]) => a - b
  )
  const _unit = defaultBreakpointOptions.unit
  const _step = defaultBreakpointOptions.step

  const up = _breakpoints.reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: `@media (min-width: ${value}${_unit})`,
    }),
    {}
  )

  const down = _breakpoints.reduce((acc, [key], i) => {
    const endIndex = i + 1
    // Biggest size is just min-width: min-size
    if (endIndex === _breakpoints.length) return { ...acc, [key]: Object.values(up)[0] }
    // Value of each key is (index + 1) - {step}0.05
    return {
      ...acc,
      [key]: `@media (max-width: ${_breakpoints[endIndex][1] - _step}${_unit})`,
    }
  }, {})

  const only = _breakpoints.reduce((acc, [key, value], i) => {
    const endIndex = i + 1
    // Biggest size is just min-width: max-size
    if (endIndex === _breakpoints.length) return { ...acc, [key]: Object.values(up)[i] }
    // Value of each key is (index + 1) - {step}0.05
    return {
      ...acc,
      [key]: `@media (min-width: ${value}${_unit}) and (max-width: ${_breakpoints[endIndex][1] - _step}${_unit})`,
    }
  }, {})

  return { up, down, only } as Breakpoint
}

export { generateBreakpoint, defaultBreakpointOptions, GenerateBreakpointParams, Breakpoint, GenerateBreakpoint }
