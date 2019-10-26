import { SvgPropertiesHyphen, StandardPropertiesHyphen } from 'csstype'

type PropertiesHyphen = keyof StandardPropertiesHyphen | keyof SvgPropertiesHyphen

type TransitionTimingFunction =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end'
  | 'inherit'
  | 'initial'
  | 'unset'
  | (string & {})

const defaultTransitionOptions: Required<GenerateTransitionParams> & { cssProperty: PropertiesHyphen } = {
  duration: 250,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  cssProperty: 'all',
}

/**
 * The typing for the __params__ of the `generateTransition` function.
 */
interface GenerateTransitionParams {
  /**
   * `duration` the value in _ms_ of the duration.
   * - Default: `250`
   */
  duration?: number
  /**
   * `easing` the transition timing function.
   * - Default: `cubic-bezier(0.4, 0, 0.2, 1)`
   */
  easing?: TransitionTimingFunction
}

/**
 * The typing for the __return__ value of the `generateTransition` function.
 */
interface Transition {
  /**
   * Builds the transition string, automatically joins two or more transitions
   * if more than one __cssProperty__ is given.
   *
   * @param cssProperties - __cssProperties__ a string or array denoting the css properties to be animated.
   * @param duration - __duration__ the value in _ms_ of the duration.
   * @param easing - __easing__ the transition timing function.
   * @returns a transition string `'<cssProperties> <duration>ms <easing>'`
   */
  (cssProperties?: PropertiesHyphen[] | PropertiesHyphen, duration?: number, easing?: TransitionTimingFunction): string
  /**
   * Builds the transition string, automatically joins two or more transitions
   * if more than one __cssProperty__ is given.
   *
   * @param cssProperties - __cssProperties__ a string or array denoting the css properties to be animated.
   * @param easing - __easing__ the transition timing function.
   * @returns a transition string `'<cssProperties> <duration>ms <easing>'`
   */
  (cssProperties?: PropertiesHyphen[] | PropertiesHyphen, easing?: TransitionTimingFunction): string
}

/**
 * The typing for the `generateTransition` function.
 */
interface GenerateTransition {
  /**
   * Generates the transition function.
   * The transition function can be used to easily set transitions based on default inputs.
   *
   * @param options - __options__ object to initialize the function with.
   * @returns the transition function.
   */
  (options?: GenerateTransitionParams): Transition
}

/**
 * Generates the transition function.
 * The transition function can be used to easily set transitions based on default inputs.
 */
const generateTransition: GenerateTransition = (options?: GenerateTransitionParams) => {
  const transition: Transition = (
    cssProperties?: PropertiesHyphen[] | PropertiesHyphen,
    duration?: number | TransitionTimingFunction,
    easing?: TransitionTimingFunction
  ): string => {
    const isDurationString = typeof duration === 'string'
    const _duration = isDurationString
      ? (options && options.duration) || defaultTransitionOptions.duration
      : duration || (options && options.duration) || defaultTransitionOptions.duration
    const _easing = isDurationString
      ? duration
      : easing || (options && options.easing) || defaultTransitionOptions.easing
    const _cssProperties = cssProperties || defaultTransitionOptions.cssProperty

    if (typeof _cssProperties === 'string') return `${_cssProperties} ${_duration}ms ${_easing}`
    return _cssProperties.map(v => `${v} ${_duration}ms ${_easing}`).join(', ')
  }
  return transition
}

export { generateTransition, defaultTransitionOptions, GenerateTransitionParams, Transition, GenerateTransition }
