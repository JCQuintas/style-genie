import { deepMerge } from './deep-merge'

describe('deepMerge', () => {
  it('can merge two objects together', () => {
    const original = { a: '1', b: 2, c: { c1: 10, c2: { c21: 1 } }, d: [1, 2] }
    const extra = { a: 10, c: { c2: { c22: 2 }, c3: '14' }, d: [3, 4, 5] }
    expect(deepMerge(original, extra)).toStrictEqual({
      a: 10,
      b: 2,
      c: { c1: 10, c2: { c21: 1, c22: 2 }, c3: '14' },
      d: [1, 2, 3, 4, 5],
    })
  })

  it('ignores non object input', () => {
    //@ts-ignore
    expect(deepMerge('original', 'extra')).toBe('original')
  })
})
