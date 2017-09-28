import restructure from './restructure'

describe('restructure', () => {
  it('should return an object with serialize and unserialize', () => {
    const serializer = restructure({})

    expect(serializer).toHaveProperty('serialize')
    expect(serializer).toHaveProperty('unserialize')
  })

  describe('at root', () => {
    const input = {a: 1}
    const output = {b: 1}
    const serializer = restructure({a: 'b'})

    it('should change "a" to "b" on serialize', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should change "b" to "a" on unserialize', () => {
      expect(serializer.unserialize(output)).toEqual(input)
    })

    it('should remove extra props on serialize', () => {
      const test = {a: 1, c: 2}
      expect(serializer.serialize(test)).toEqual(output)
    })

    it('should remove extra props on unserialize', () => {
      const test = {b: 1, c: 2}
      expect(serializer.unserialize(test)).toEqual(input)
    })

    it('should handle missing props on serialize', () => {
      expect(serializer.serialize({})).toEqual({})
    })

    it('should handle missing props on unserialize', () => {
      expect(serializer.unserialize({})).toEqual({})
    })
  })

  describe('with nested props', () => {
    const input = {a: {b: 1}, d: 2}
    const output = {c: 1, e: {f: 2}}
    const serializer = restructure({a: {b: 'c'}, d: 'e.f'})

    it('should map props on serialize', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should map props on unserialize', () => {
      expect(serializer.unserialize(output)).toEqual(input)
    })

    it('should remove extra props on serialize', () => {
      const test = {a: {b: 1}, d: 2, z: 3}
      expect(serializer.serialize(test)).toEqual(output)
    })

    it('should remove extra props on unserialize', () => {
      const test = {c: 1, e: {f: 2}, z: 3}
      expect(serializer.unserialize(test)).toEqual(input)
    })

    it('should handle missing props on serialize', () => {
      expect(serializer.serialize({})).toEqual({})
    })

    it('should handle missing props on unserialize', () => {
      expect(serializer.unserialize({})).toEqual({})
    })
  })
})
