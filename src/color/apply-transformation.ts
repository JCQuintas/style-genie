export const applyTransform = (original: number, transform?: number) => {
  if (!transform) return original * 100
  return Math.min(Math.max(original * 100 * (1 + transform), 0), 100)
}
