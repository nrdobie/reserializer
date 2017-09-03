import remove from './remove'

describe('remove', () => {
  it('should create a new object', () => {
    const input = {a: 1, b: 2}

    expect(remove(input, 'a')).not.toBe(input)
  })

  it('should remove key from object', () => {
    const input = {a: 1, b: 2}
    const output = {b: 2}

    expect(remove(input, 'a')).toEqual(output)
  })

  it('should handle a missing key', () => {
    const input = {a: 1, b: 2}

    expect(remove(input, 'c')).toBe(input)
  })
})
