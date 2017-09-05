import remove from './remove'

describe('remove', () => {
  describe('at root level', () => {
    const input = {a: 1, b: 2}
    const output = {b: 2}
    const serializer = remove('a')

    it('should remove on serialize', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should remove on unserialize', () => {
      expect(serializer.unserialize(input)).toEqual(output)
    })

    it('should return input on serialize if no key', () => {
      const test = {b: 2}

      expect(serializer.serialize(test)).toBe(test)
    })

    it('should return input on unserialize if no key', () => {
      const test = {b: 2}

      expect(serializer.unserialize(test)).toBe(test)
    })
  })

  describe('at nested with string path', () => {
    const input = {a: 1, b: {c: 2, d: 3}}
    const output = {a: 1, b: {d: 3}}
    const serializer = remove('b.c')

    it('should remove on serialize', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should remove on unserialize', () => {
      expect(serializer.unserialize(input)).toEqual(output)
    })

    it('should return input on serialize if no key', () => {
      const test = {a: 1, b: {d: 3}}

      expect(serializer.serialize(test)).toBe(test)
    })

    it('should return input on serialize if no key', () => {
      const test = {a: 1, b: {d: 3}}

      expect(serializer.unserialize(test)).toBe(test)
    })
  })

  describe('at nested with array path', () => {
    const input = {a: 1, b: {c: 2, d: 3}}
    const output = {a: 1, b: {d: 3}}
    const serializer = remove(['b', 'c'])

    it('should remove on serialize', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should remove on unserialize', () => {
      expect(serializer.unserialize(input)).toEqual(output)
    })

    it('should return input on serialize if no key', () => {
      const test = {a: 1, b: {d: 3}}

      expect(serializer.serialize(test)).toBe(test)
    })

    it('should return input on serialize if no key', () => {
      const test = {a: 1, b: {d: 3}}

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

    it('should remove a tree on serialze', () => {
      const serializer = remove('b')
      delete output.b

      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should remove a tree on unserialze', () => {
      const serializer = remove('b')
      delete output.b

      expect(serializer.unserialize(input)).toEqual(output)
    })

    it('should remove an empty tree on serialze', () => {
      const serializer = remove('e.f.g')
      delete output.e

      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should remove an empty tree on unserialze', () => {
      const serializer = remove('e.f.g')
      delete output.e

      expect(serializer.unserialize(input)).toEqual(output)
    })
  })
})
