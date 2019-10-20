const DEFAULT_DURATION = 250
const DEFAULT_EASING = 'cubic-bezier(0.4,0,0.2,1)'
const DEFAULT_CSS_PROP = 'all'

export interface TransitionParams {
  duration: number
  easing: string
}

export const transition = (options?: TransitionParams) => (
  cssProperties?: string[] | string,
  duration?: number | string,
  easing?: string
) => {
  const isDurationString = typeof duration === 'string'
  const _duration = isDurationString ? (options && options.duration) || DEFAULT_DURATION : duration || DEFAULT_DURATION
  const _easing = isDurationString ? duration : easing || (options && options.easing) || DEFAULT_EASING
  const _cssProperties = cssProperties || DEFAULT_CSS_PROP

  if (typeof _cssProperties === 'string') return `${_cssProperties} ${_duration}ms ${_easing}`
  return _cssProperties.map(v => `${v} ${_duration}ms ${_easing}`).join(', ')
}
