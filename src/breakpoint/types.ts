type FilterProperties<T, P> = { [K in keyof T]: K extends P ? K : never }[keyof T]

type PickEntries<T> = T[FilterProperties<T, 'entries'>]

type Merge<T extends CreateBreakpointParams, Z extends CreateBreakpointParams> = Omit<T, Extract<keyof T, keyof Z>> &
  Omit<Z, Exclude<keyof Z, keyof T>>

type MergeParams<T extends CreateBreakpointParams = {}> = T['entries'] extends undefined
  ? DefaultEntries
  : keyof T['entries'] extends undefined
  ? DefaultEntries
  : Merge<DefaultEntries, T>

export type BreakpointsInferred<T extends CreateBreakpointParams> = {
  up: { [P in keyof PickEntries<MergeParams<T>>]: string }
  down: { [P in keyof PickEntries<MergeParams<T>>]: string }
}

export interface CreateBreakpointParams {
  entries?: { [key: string]: number }
  unit?: string
  step?: number
}

export type Breakpoint<T extends { [key: string]: number }> = {
  up: { [P in keyof T]: string }
  down: { [P in keyof T]: string }
}

interface DefaultEntries {
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
