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

interface GenerateTransitionParams {
  duration?: number
  easing?: TransitionTimingFunction
}

const defaultTransitionOptions: Required<GenerateTransitionParams> & { cssProperty: PropertiesHyphen } = {
  duration: 250,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  cssProperty: 'all',
}

interface Transition {
  (cssProperties?: PropertiesHyphen[] | PropertiesHyphen, duration?: number, easing?: TransitionTimingFunction): string
  (cssProperties?: PropertiesHyphen[] | PropertiesHyphen, easing?: TransitionTimingFunction): string
}

interface GenerateTransition {
  (options?: GenerateTransitionParams): Transition
}

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
