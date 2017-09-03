import create, { CREATE_ID } from './create'

function serializerFactory (name) {
  const modifier = (input) => `${input} -> ${name}`

  return {
    serialize: jest.fn(modifier),
    unserialize: jest.fn(modifier),
    [CREATE_ID]: true
  }
}

describe('create', () => {
  let A
  let B
  let C
  let serializer

  beforeEach(() => {
    A = serializerFactory('A')
    B = serializerFactory('B')
    C = serializerFactory('C')

    serializer = create(A, B, C)
  })

  it ('should have create identifier', () => {
    expect(serializer[CREATE_ID]).toBe(true)
  })

  describe('serialize', () => {
    it ('should call all transforms', () => {
      serializer.serialize('S')

      expect(A.serialize).toHaveBeenCalled()
      expect(B.serialize).toHaveBeenCalled()
      expect(C.serialize).toHaveBeenCalled()
    })

    it ('should call transforms in the correct order', () => {
      expect(serializer.serialize('S')).toBe('S -> C -> B -> A')
    })
  })

  describe('serialize with array', () => {
    it ('should call all transforms', () => {
      serializer.serialize(['S0', 'S1'])

      expect(A.serialize).toHaveBeenCalledTimes(2)
      expect(B.serialize).toHaveBeenCalledTimes(2)
      expect(C.serialize).toHaveBeenCalledTimes(2)
    })

    it ('should call transforms in the correct order', () => {
      expect(serializer.serialize(['S0', 'S1'])).toEqual(['S0 -> C -> B -> A', 'S1 -> C -> B -> A'])
    })
  })

  describe('unserialize', () => {
    it ('should call all transforms', () => {
      serializer.unserialize('U')

      expect(A.unserialize).toHaveBeenCalled()
      expect(B.unserialize).toHaveBeenCalled()
      expect(C.unserialize).toHaveBeenCalled()
    })

    it ('should call transforms in the correct order', () => {
      expect(serializer.unserialize('U')).toBe('U -> A -> B -> C')
    })
  })
  
  describe('unserialize with array', () => {
    it ('should call all transforms', () => {
      serializer.unserialize(['U0', 'U1'])

      expect(A.unserialize).toHaveBeenCalledTimes(2)
      expect(B.unserialize).toHaveBeenCalledTimes(2)
      expect(C.unserialize).toHaveBeenCalledTimes(2)
    })

    it ('should call transforms in the correct order', () => {
      expect(serializer.unserialize(['U0', 'U1'])).toEqual(['U0 -> A -> B -> C', 'U1 -> A -> B -> C'])
    })
  })

  it('should support nesting creates', () => {
    const D = serializerFactory('D')
    const subSerializer = create(B, C)
    const serializer = create(A, subSerializer, D)

    expect(serializer.serialize('S')).toBe('S -> D -> C -> B -> A')
    expect(serializer.unserialize('U')).toBe('U -> A -> B -> C -> D')
  })

  it('should support nesting creates with arrays', () => {
    const D = serializerFactory('D')
    const subSerializer = create(B, C)
    const serializer = create(A, subSerializer, D)

    expect(serializer.serialize(['S0', 'S1'])).toEqual(['S0 -> D -> C -> B -> A', 'S1 -> D -> C -> B -> A'])
    expect(serializer.unserialize(['U0', 'U1'])).toEqual(['U0 -> A -> B -> C -> D', 'U1 -> A -> B -> C -> D'])
  })
})
