export type FilterProperties<T, P> = { [K in keyof T]: K extends P ? K : never }[keyof T]

export type PickEntries<T> = T[FilterProperties<T, 'entries'>]
export type PickBreakpoint<T> = T[FilterProperties<T, 'breakpoint'>]
export type PickPalette<T> = T[FilterProperties<T, 'palette'>]

export type Merge<T, Z> = Omit<T, Extract<keyof T, keyof Z>> & Omit<Z, Exclude<keyof Z, keyof T>>
