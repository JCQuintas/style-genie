import { CreateBreakpointParams, BreakpointsInferred, Breakpoint } from './types'

export const defaultBreakpoints = {
  entries: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  unit: 'px',
  step: 5,
}

export const createBreakpoint = <O extends CreateBreakpointParams = typeof defaultBreakpoints>(
  options?: O
): BreakpointsInferred<O> => {
  // Sort entries ascending by value
  const _entries = Object.entries((options && options.entries) || defaultBreakpoints.entries).sort(
    ([_, a], [__, b]) => a - b
  )
  const _unit = (options && options.unit) || defaultBreakpoints.unit
  const _step = (options && options.step) || defaultBreakpoints.step

  const up = _entries.reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: `@media (min-width:${value}${_unit})`,
    }),
    {}
  )

  const down = _entries.reduce((acc, [key], i) => {
    const endIndex = i + 1
    // Biggest size is just min-width: min-size
    if (endIndex === _entries.length) return { ...acc, [key]: Object.values(up)[0] }
    // Value of each key is index + 1 - step(5) / 100
    return {
      ...acc,
      [key]: `@media (max-width:${_entries[endIndex][1] - _step / 100}${_unit})`,
    }
  }, {})

  return ({ up, down } as unknown) as BreakpointsInferred<O>
}

export { CreateBreakpointParams, Breakpoint }
