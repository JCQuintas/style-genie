const defaultBreakpointOptions = {
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  unit: 'px',
  step: 5,
}

/**
 * The typing for the __params__ of the `generateBreakpoint` function.
 */
interface GenerateBreakpointParams {
  /** `breakpoints` is an object of number values used to define the breakpoints. */
  breakpoints: { [key: string]: number }
}

/**
 * The typing for __return__ value of the `generateBreakpoint` function.
 *
 * @typeparam T is _optional_ and is used to define the shape of `up` and `down`
 */
type Breakpoint<T extends { [key: string]: number } = typeof defaultBreakpointOptions['breakpoints']> = {
  /** `up` is the __min-width__ in which the breakpoint should take effect `@media (min-width: --px)`. */
  up: { [P in keyof T]: string }
  /** `down` is the __max-width__ in which the breakpoint should take effect `@media (max-width: --px)`. */
  down: { [P in keyof T]: string }
}

/**
 * The typing for the `generateBreakpoint` function.
 */
interface GenerateBreakpoint {
  /**
   * Generate the breakpoints object based on the default breakpoints.
   *
   * ```ts
   * breakpoints = {
   *   xs: 0,
   *   sm: 600,
   *   md: 960,
   *   lg: 1280,
   *   xl: 1920
   * }
   * ```
   *
   * @returns the breakpoints object with every value pre-calculated.
   */
  (): Breakpoint
  /**
   * Generate the breakpoints object based on the given input.
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

/**
 * Generate the breakpoints object.
 */
const generateBreakpoint: GenerateBreakpoint = (options?: GenerateBreakpointParams) => {
  // Sort breakpoints ascending by value
  const _breakpoints = Object.entries((options && options.breakpoints) || defaultBreakpointOptions.breakpoints).sort(
    ([_, a], [__, b]) => a - b
  )
  const _unit = defaultBreakpointOptions.unit
  const _step = defaultBreakpointOptions.step

  const up = _breakpoints.reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: `@media (min-width: ${value}${_unit})`,
    }),
    {}
  )

  const down = _breakpoints.reduce((acc, [key], i) => {
    const endIndex = i + 1
    // Biggest size is just min-width: min-size
    if (endIndex === _breakpoints.length) return { ...acc, [key]: Object.values(up)[0] }
    // Value of each key is index + 1 - step(5) / 100
    return {
      ...acc,
      [key]: `@media (max-width: ${_breakpoints[endIndex][1] - _step / 100}${_unit})`,
    }
  }, {})

  return { up, down } as Breakpoint
}

export { generateBreakpoint, defaultBreakpointOptions, GenerateBreakpointParams, Breakpoint, GenerateBreakpoint }
