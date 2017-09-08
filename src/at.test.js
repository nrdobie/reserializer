import at from './at'
import create, { CREATE_ID } from './create'

jest.mock('./create')

describe('at', () => {
  describe('with missing property', () => {
    let input
    let serializer
    let subSerializer

    beforeEach(() => {
      input = {a: {b: 1, c: 2}}

      subSerializer = {
        serialize: jest.fn((i) => i),
        unserialize: jest.fn((i) => i),
        [CREATE_ID]: true
      }

      serializer = at('d', subSerializer)
    })

    it('should return input on serialize', () => {
      expect(serializer.serialize(input)).toBe(input)
    })

    it('should return input on unserialize', () => {
      expect(serializer.unserialize(input)).toBe(input)
    })
  })

  describe('with sub tree', () => {
    let input
    let serializer
    let subSerializer

    beforeEach(() => {
      input = {a: {b: 1, c: 2}}

      subSerializer = {
        serialize: jest.fn((i) => i),
        unserialize: jest.fn((i) => i),
        [CREATE_ID]: true
      }

      serializer = at('a', subSerializer)
    })

    it('should call subSerializer.serialize on serialize', () => {
      serializer.serialize(input)

      expect(subSerializer.serialize).toHaveBeenCalledWith(input.a)
    })

    it('should call subSerializer.unserialize on unserialize', () => {
      serializer.unserialize(input)

      expect(subSerializer.unserialize).toHaveBeenCalledWith(input.a)
    })

    it('should pass through new serialize value', () => {
      const output = {a: {d: 3}}
      subSerializer.serialize.mockImplementation(() => output.a)

      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should pass through new unserialize value', () => {
      const output = {a: {d: 3}}
      subSerializer.unserialize.mockImplementation(() => output.a)

      expect(serializer.unserialize(input)).toEqual(output)
    })
  })

  describe('with nested property with path as string', () => {
    let input
    let serializer
    let subSerializer

    beforeEach(() => {
      input = {a: {b: 1, c: {d: 2, e: 3}}}

      subSerializer = {
        serialize: jest.fn((i) => i),
        unserialize: jest.fn((i) => i),
        [CREATE_ID]: true
      }

      serializer = at('a.c', subSerializer)
    })

    it('should call subSerializer.serialize on serialize', () => {
      serializer.serialize(input)

      expect(subSerializer.serialize).toHaveBeenCalledWith(input.a.c)
    })

    it('should call subSerializer.unserialize on unserialize', () => {
      serializer.unserialize(input)

      expect(subSerializer.unserialize).toHaveBeenCalledWith(input.a.c)
    })

    it('should pass through new serialize value', () => {
      const output = {a: {b: 1, c: {f: 4}}}
      subSerializer.serialize.mockImplementation(() => output.a.c)

      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should pass through new unserialize value', () => {
      const output = {a: {b: 1, c: {f: 4}}}
      subSerializer.unserialize.mockImplementation(() => output.a.c)

      expect(serializer.unserialize(input)).toEqual(output)
    })
  })

  describe('with nested property with path as array', () => {
    let input
    let serializer
    let subSerializer

    beforeEach(() => {
      input = {a: {b: 1, c: {d: 2, e: 3}}}

      subSerializer = {
        serialize: jest.fn((i) => i),
        unserialize: jest.fn((i) => i),
        [CREATE_ID]: true
      }

      serializer = at(['a', 'c'], subSerializer)
    })

    it('should call subSerializer.serialize on serialize', () => {
      serializer.serialize(input)

      expect(subSerializer.serialize).toHaveBeenCalledWith(input.a.c)
    })

    it('should call subSerializer.unserialize on unserialize', () => {
      serializer.unserialize(input)

      expect(subSerializer.unserialize).toHaveBeenCalledWith(input.a.c)
    })

    it('should pass through new serialize value', () => {
      const output = {a: {b: 1, c: {f: 4}}}
      subSerializer.serialize.mockImplementation(() => output.a.c)

      expect(serializer.serialize(input)).toEqual(output)
    })

    it('should pass through new unserialize value', () => {
      const output = {a: {b: 1, c: {f: 4}}}
      subSerializer.unserialize.mockImplementation(() => output.a.c)

      expect(serializer.unserialize(input)).toEqual(output)
    })
  })

  describe('with multiple serializer', () => {
    let A
    let B
    let C

    beforeEach(() => {
      A = jest.fn()
      B = jest.fn()
      C = jest.fn()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should call "create"', () => {
      at('a', A, B, C)

      expect(create).toHaveBeenCalledWith(A, B, C)
    })

    it('should call "create" with one serializer', () => {
      at('a', A)

      expect(create).toHaveBeenCalledWith(A)
    })

    it('should not call "create" when passed a serializer that is from create', () => {
      A[CREATE_ID] = true
      at('a', A)

      expect(create).not.toHaveBeenCalled()
    })
  })
})
