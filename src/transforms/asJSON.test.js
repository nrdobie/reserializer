import asJSON from './asJSON'

describe('asJSON', () => {
  it ('should have preadded "serialize"', () => {
    expect(asJSON.serialize).toBeDefined()
  })

  it ('should have preadded "unserialize"', () => {
    expect(asJSON.unserialize).toBeDefined()
  })

  describe('when initialized', () => {
    const obj = {test: true}
    const str = '{"test":true}'
    let serializer

    beforeEach(() => {
      serializer = asJSON()
    })
    it ('should have "serialize"', () => {
      expect(serializer.serialize).toBeDefined()
    })
  
    it ('should have "unserialize"', () => {
      expect(serializer.unserialize).toBeDefined()
    })

    it('should convert an object to a JSON string', () => {
      expect(serializer.serialize(obj)).toBe(str)
    })

    it('should convert a JSON string to an object', () => {
      expect(serializer.unserialize(str)).toEqual(obj)
    })
  })
})
