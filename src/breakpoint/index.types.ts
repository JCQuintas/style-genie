/**
 * The typing for the __params__ of the `generateBreakpoint` function.
 */
export interface GenerateBreakpointParams {
  /**
   * `breakpoints` is an object of number values used to define the breakpoints.
   */
  breakpoints: { [key: string]: number }
}

/**
 * The typing for the __return__ value of the `generateBreakpoint` function.
 *
 * @typeparam T is _optional_ and is used to define the shape of `up`, `down` and `only`
 */
export interface Breakpoint<T extends { [key: string]: number } = Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>> {
  /**
   * `up` is the __min-width__ in which the breakpoint should take effect `@media (min-width: --px)`.
   */
  up: { [P in keyof T]: string }
  /**
   * `down` is the __max-width__ in which the breakpoint should take effect `@media (max-width: --px)`.
   */
  down: { [P in keyof T]: string }
  /**
   * `only` will only have effect when in between the actual key value and the next bigger size `@media (min-width: --px) and (max-width: --px)`.
   */
  only: { [P in keyof T]: string }
  /**
   * `between` will have effect when in between the input values `@media (min-width: --px) and (max-width: --px)`.
   */
  between: (from: keyof T, to: keyof T) => string
}

/**
 * The typing for the `generateBreakpoint` function.
 */
export interface GenerateBreakpoint {
  /**
   * Generate the breakpoints object based on the default breakpoints.
   * The breakpoints object has media query strings generated based on the input object values.
   *
   * @returns the breakpoints object with every value pre-calculated.
   */
  (): Breakpoint
  /**
   * Generate the breakpoints object based on the given input.
   * The breakpoints object has media query strings generated based on the input object values.
   *
   * ```ts
   * breakpoints = {
   *   [key: string]: number
   * }
   * ```
   *
   * @param options - __options__ object to initialize the function with.
   * @returns the breakpoints object with every value pre-calculated.
   */
  <O extends GenerateBreakpointParams>(options?: O): Breakpoint<O['breakpoints']>
}
