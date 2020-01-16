export const applyTransform = (original: number, transform?: number) => {
  if (!transform) return original
  if (original === 0) return Math.min(Math.max(transform * 100, 0), 100)
  return Math.min(Math.max(original * (1 + transform), 0), 100)
}
