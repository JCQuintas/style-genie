type FilterProperties<T, P> = { [K in keyof T]: K extends P ? K : never }[keyof T]

type PickEntries<T> = T[FilterProperties<T, 'entries'>]

type Breakpoint<T> = { [P in keyof T]: string }

type Breakpoints<T> = {
  up: Breakpoint<T>
  down: Breakpoint<T>
}

type Entries<T> = { [K in keyof T]: number }

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

export const breakpoint = <E = PickEntries<typeof defaultBreakpointParams>>(
  entries?: Entries<E>,
  unit?: string,
  step?: number
): Breakpoints<E> => {
  const _entries = entries || (defaultBreakpointParams.entries as PickEntries<typeof defaultBreakpointParams>)
  const _unit = unit || defaultBreakpointParams.unit
  const _step = step || defaultBreakpointParams.step
  const keys = Object.keys(_entries)

  const up = Object.fromEntries(
    Object.entries(_entries).map(([key, value]) => [key, `@media (min-width:${value}${_unit})`])
  )

  const down = Object.fromEntries(
    Object.keys(_entries).map((key, i) => {
      const endIndex = i + 1
      if (endIndex === keys.length) return [key, Object.values(up)[0]]
      return [key, `@media (max-width:${_entries[keys[endIndex] as keyof typeof entries] - _step / 100}${_unit})`]
    })
  )

  return { up, down } as Breakpoints<E>
}

breakpoint().down.lg
// breakpoint('em').down.lg
breakpoint({
  a: 1,
}).down.a
