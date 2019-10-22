import { CreateBreakpointParams, BreakpointsInferred, Breakpoint } from './types'

const defaultBreakpoints = {
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

export const createBreakpoint = <O extends CreateBreakpointParams>(options?: O): BreakpointsInferred<O> => {
  const _entries = (options && options.entries) || defaultBreakpoints.entries
  const _unit = (options && options.unit) || defaultBreakpoints.unit
  const _step = (options && options.step) || defaultBreakpoints.step
  const keys = Object.keys(_entries)

  const up = Object.fromEntries(
    Object.entries(_entries).map(([key, value]) => [key, `@media (min-width:${value}${_unit})`])
  )

  const down = Object.fromEntries(
    Object.keys(_entries).map((key, i) => {
      const endIndex = i + 1
      if (endIndex === keys.length) return [key, Object.values(up)[0]]
      return [key, `@media (max-width:${_entries[keys[endIndex] as keyof typeof _entries] - _step / 100}${_unit})`]
    })
  )

  return { up, down } as BreakpointsInferred<O>
}

export { CreateBreakpointParams, Breakpoint }
