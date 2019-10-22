type FilterProperties<T, P> = { [K in keyof T]: K extends P ? K : never }[keyof T]

type PickEntries<T> = T[FilterProperties<T, 'entries'>]

type BreakpointsInferred<T extends CreateBreakpointParams> = {
  up: { [P in keyof PickEntries<MergeParams<T>>]: string }
  down: { [P in keyof PickEntries<MergeParams<T>>]: string }
}

export interface CreateBreakpointParams {
  entries?: { [key: string]: number }
  unit?: string
  step?: number
}

export type Breakpoint<T extends { [key: string]: number }> = {
  up: Breakpoint<T>
  down: Breakpoint<T>
}

type Merge<T extends CreateBreakpointParams, Z extends CreateBreakpointParams> = Omit<T, Extract<keyof T, keyof Z>> &
  Omit<Z, Exclude<keyof Z, keyof T>>

type MergeParams<T extends CreateBreakpointParams = {}> = T['entries'] extends undefined
  ? typeof defaultBreakpoints
  : keyof T['entries'] extends undefined
  ? typeof defaultBreakpoints
  : Merge<typeof defaultBreakpoints, T>

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
