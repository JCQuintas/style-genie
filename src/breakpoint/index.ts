import { PickEntries, FilterProperties, Merge } from 'utils'

type Breakpoint<T> = { [P in keyof T]: string }

type Breakpoints<T> = {
  up: Breakpoint<T>
  down: Breakpoint<T>
}

export interface BreakpointParams<T = {}> {
  entries?: { [K in keyof PickEntries<T>]: number }
  unit?: string
  step?: number
}

export const defaultBreakpointParams = {
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

export const breakpoint = <O, T extends Merge<typeof defaultBreakpointParams, O>>(options?: BreakpointParams<O>) => {
  const entries = (options && options.entries) || defaultBreakpointParams.entries
  const unit = (options && options.unit) || defaultBreakpointParams.unit
  const step = (options && options.step) || defaultBreakpointParams.step
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

  return { up, down } as FilterProperties<
    PickEntries<T>,
    keyof PickEntries<T>
  > extends keyof typeof defaultBreakpointParams['entries']
    ? Breakpoints<PickEntries<typeof defaultBreakpointParams>>
    : Breakpoints<PickEntries<T>>
}

breakpoint().down.lg
breakpoint({ unit: 'em' }).down.lg
const b = breakpoint({
  entries: {
    a: 1,
  },
}).down
