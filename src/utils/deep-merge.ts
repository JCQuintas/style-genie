export const deepMerge = <T extends object>(original: { [key: string]: any }, toMerge: { [key: string]: any }): T => {
  const _original = { ...original }
  const isObject = (obj: any) => obj && typeof obj === 'object'

  if (!isObject(_original) || !isObject(toMerge)) {
    return original as T
  }

  Object.keys(toMerge).forEach(key => {
    const _originalValue = _original[key]
    const toMergeValue = toMerge[key]

    if (Array.isArray(_originalValue) && Array.isArray(toMergeValue)) {
      _original[key] = _originalValue.concat(toMergeValue)
    } else if (isObject(_originalValue) && isObject(toMergeValue)) {
      _original[key] = deepMerge({ ..._originalValue }, toMergeValue)
    } else {
      _original[key] = toMergeValue
    }
  })

  return _original as T
}
