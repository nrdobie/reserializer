import date from './date'

describe('date', () => {
  describe('at root level', () => {
    const input = {a: new Date(0)}
    const output = {a: '1970-01-01T00:00:00.000Z'}
    const serializer = date('a')

    it('should convert date to ISO string', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should convert ISO string to date', () => {
      expect(serializer.unserialize(output)).toEqual(input)
    })

    it('should return input if no property on serialize', () => {
      const test = {b: true}
      expect(serializer.serialize(test)).toBe(test)
    })

    it('should return input if not a date on serialize', () => {
      input.a = []
      expect(serializer.serialize(input)).toBe(input)
    })

    it('should return output if no property on unserialize', () => {
      const test = {b: true}
      expect(serializer.unserialize(test)).toBe(test)
    })

    it('should return output if not an ISO string on unserialize', () => {
      output.a = 'not a date'
      expect(serializer.serialize(output)).toBe(output)
    })
  })

  describe('nested property with string path', () => {
    const input = {a: {b: new Date(0)}}
    const output = {a: {b: '1970-01-01T00:00:00.000Z'}}
    const serializer = date('a.b')

    it('should convert date to ISO string', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should convert ISO string to date', () => {
      expect(serializer.unserialize(output)).toEqual(input)
    })

    it('should return input if no property on serialize', () => {
      const test = {a: {c: true}}
      expect(serializer.serialize(test)).toBe(test)
    })

    it('should return input if not a date on serialize', () => {
      input.a.b = []
      expect(serializer.serialize(input)).toBe(input)
    })

    it('should return input if no property on unserialize', () => {
      const test = {a: {c: true}}
      expect(serializer.unserialize(test)).toBe(test)
    })

    it('should return output if not an ISO string on unserialize', () => {
      output.a.b = 'not a date'
      expect(serializer.serialize(output)).toBe(output)
    })
  })

  describe('nested property with array path', () => {
    const input = {a: {b: new Date(0)}}
    const output = {a: {b: '1970-01-01T00:00:00.000Z'}}
    const serializer = date(['a', 'b'])

    it('should convert date to ISO string', () => {
      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should convert ISO string to date', () => {
      expect(serializer.unserialize(output)).toEqual(input)
    })

    it('should return input if no property on serialize', () => {
      const test = {a: {c: true}}
      expect(serializer.serialize(test)).toBe(test)
    })

    it('should return input if not a date on serialize', () => {
      input.a.b = []
      expect(serializer.serialize(input)).toBe(input)
    })

    it('should return input if no property on unserialize', () => {
      const test = {a: {c: true}}
      expect(serializer.unserialize(test)).toBe(test)
    })

    it('should return output if not an ISO string on unserialize', () => {
      output.a.b = 'not a date'
      expect(serializer.serialize(output)).toBe(output)
    })
  })
})
