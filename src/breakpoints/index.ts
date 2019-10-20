type Breakpoint<T> = { [P in keyof T]: string }

type Breakpoints<T> = {
  up: Breakpoint<T>
  down: Breakpoint<T>
}

type FilterProperties<T, P> = { [K in keyof T]: K extends P ? K : never }[keyof T]
type PickEntries<T> = T[FilterProperties<T, 'entries'>]

interface defaultEntries {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export interface BreakpointsParams<T = {}> {
  entries?: { [K in keyof PickEntries<T>]: number }
  unit?: string
  step?: number
}

export const breakpointDefaults = {
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

export const breakpoints = <O>(options?: BreakpointsParams<O>) => {
  const entries = (options && options.entries) || breakpointDefaults.entries
  const unit = (options && options.unit) || breakpointDefaults.unit
  const step = (options && options.step) || breakpointDefaults.step
  const keys = Object.keys(entries)

  const up = Object.fromEntries(
    Object.entries(entries).map(([key, value]) => [key, `@media (min-width:${value}${unit})`])
  )

  const down = Object.fromEntries(
    Object.keys(entries).map((key, i) => {
      const endIndex = i + 1
      if (endIndex === keys.length) return [key, Object.values(up)[0]]
      return [key, `@media (max-width:${entries[keys[endIndex] as keyof typeof entries] - step / 100}${unit})`]
    })
  )

  return { up, down } as FilterProperties<O, 'entries'> extends 'entries'
    ? Breakpoints<PickEntries<O>>
    : Breakpoints<PickEntries<typeof breakpointDefaults>>
}

// breakpoints().up
// breakpoints().down
// breakpoints({ entries: { a: 1, b: 2 } }).up
// breakpoints({ entries: { a: 1, b: 2 } }).down
