import rename from './rename'

describe('rename', () => {
  describe('at root', () => {
    const input = {a: 1}
    const output = {b: 1}
    const serializer = rename('a', 'b')

    it('should change "a" to "b" on serialize', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should change "b" to "a" on unserialize', () => {
      expect(serializer.unserialize(output)).toEqual(input)
    })

    it('should handle missing property on serialize', () => {
      const test = {c: 1}

      expect(serializer.serialize(test)).toBe(test)
    })

    it('should handle missing property on unserialize', () => {
      const test = {c: 1}

      expect(serializer.unserialize(test)).toBe(test)
    })
  })

  describe('at nested with string path', () => {
    const input = {a: {b: 1}}
    const output = {c: {d: 1}}
    const serializer = rename('a.b', 'c.d')

    it('should change "a.b" to "c.d" on serialize', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should change "c.d" to "a.b" on unserialize', () => {
      expect(serializer.unserialize(output)).toEqual(input)
    })

    it('should handle missing property on serialize', () => {
      const test = {a: {c: 2}}

      expect(serializer.serialize(test)).toBe(test)
    })

    it('should handle missing property on unserialize', () => {
      const test = {c: {e: 2}}

      expect(serializer.unserialize(test)).toBe(test)
    })
  })

  describe('at nested with array path', () => {
    const input = {a: {b: 1}}
    const output = {c: {d: 1}}
    const serializer = rename(['a', 'b'], ['c', 'd'])

    it('should change "a.b" to "c.d" on serialize', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should change "c.d" to "a.b" on unserialize', () => {
      expect(serializer.unserialize(output)).toEqual(input)
    })

    it('should handle missing property on serialize', () => {
      const test = {a: {c: 2}}

      expect(serializer.serialize(test)).toBe(test)
    })

    it('should handle missing property on unserialize', () => {
      const test = {c: {e: 2}}

      expect(serializer.unserialize(test)).toBe(test)
    })
  })

  describe('with tree', () => {
    let input
    let output

    beforeEach(() => {
      input = {a: 1, b: {c: 2, d: 3}, e: {f: {g: 4}}}
      output = {a: 1, b: {c: 2, d: 3}, e: {f: {g: 4}}}
    })

    it('should move tree', () => {
      const serializer = rename('b', 'z')
      output.z = output.b
      delete output.b

      expect(serializer.serialize(input)).toEqual(output)
      expect(serializer.unserialize(output)).toEqual(input)
    })

    it('should move tree', () => {
      const serializer = rename('b.d', 'b.z')
      output.b.z = output.b.d
      delete output.b.d

      expect(serializer.serialize(input)).toEqual(output)
      expect(serializer.unserialize(output)).toEqual(input)
    })
  })
})
