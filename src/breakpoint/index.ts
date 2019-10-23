// import { CreateBreakpointParams, BreakpointsInferred, Breakpoint } from './types'

interface DefaultParams {
  entries: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  unit: string
  step: number
}

const defaultBreakpointOptions: Required<DefaultParams> = {
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

interface CreateBreakpointParams {
  entries: { [key: string]: number }
  unit: string
  step: number
}

type Breakpoint<T extends { [key: string]: number } = DefaultParams['entries']> = {
  up: { [P in keyof T]: string }
  down: { [P in keyof T]: string }
}

type RequiredEntries = Pick<CreateBreakpointParams, 'entries'> & Omit<Partial<CreateBreakpointParams>, 'entries'>

interface CreateBreakpoint {
  <O extends RequiredEntries>(options: O): Breakpoint<O['entries']>
  (): Breakpoint
  (options: Partial<CreateBreakpointParams>): Breakpoint
}

const createBreakpoint: CreateBreakpoint = (options?: Partial<CreateBreakpointParams>): Breakpoint => {
  // Sort entries ascending by value
  const _entries = Object.entries((options && options.entries) || defaultBreakpointOptions.entries).sort(
    ([_, a], [__, b]) => a - b
  )
  const _unit = (options && options.unit) || defaultBreakpointOptions.unit
  const _step = (options && options.step) || defaultBreakpointOptions.step

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

  return ({ up, down } as unknown) as Breakpoint
}

export { createBreakpoint, defaultBreakpointOptions, CreateBreakpointParams, Breakpoint, CreateBreakpoint }
