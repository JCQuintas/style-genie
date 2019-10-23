interface GenerateTransitionParams {
  duration?: number
  easing?: string
}

const defaultTransitionOptions: Required<GenerateTransitionParams> & { cssProperty: string } = {
  duration: 250,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  cssProperty: 'all',
}

interface Transition {
  (cssProperties?: string[] | string, duration?: number, easing?: string): string
  (cssProperties?: string[] | string, easing?: string): string
}

interface GenerateTransition {
  (options?: GenerateTransitionParams): Transition
}

const generateTransition: GenerateTransition = (options?: GenerateTransitionParams) => {
  const transition: Transition = (
    cssProperties?: string[] | string,
    duration?: number | string,
    easing?: string
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
