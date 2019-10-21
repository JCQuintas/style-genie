declare module 'styled-utils' {
  type FilterProperties<T, P> = { [K in keyof T]: K extends P ? K : never }[keyof T]

  type PickEntries<T> = T[FilterProperties<T, 'entries'>]

  type Breakpoint<T> = { [P in keyof T]: string }

  type Breakpoints<T> = {
    up: Breakpoint<T>
    down: Breakpoint<T>
  }

  export type BreakpointParams<T = {}> = {
    entries?: { [K in keyof PickEntries<T>]: number }
    unit?: string
    step?: number
  }

  export function breakpoint<O>(options?: BreakpointParams<O>): Breakpoints<typeof options['entries']>
}
