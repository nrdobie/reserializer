import asPrettyJSON from './asPrettyJSON'

describe('asPrettyJSON', () => {
  it('should have preadded "serialize"', () => {
    expect(asPrettyJSON.serialize).toBeDefined()
  })

  it('should have preadded "unserialize"', () => {
    expect(asPrettyJSON.unserialize).toBeDefined()
  })

  describe('when initialized', () => {
    const obj = {test: true}
    const str = '{\n  "test": true\n}'
    let serializer

    beforeEach(() => {
      serializer = asPrettyJSON()
    })
    it('should have "serialize"', () => {
      expect(serializer.serialize).toBeDefined()
    })

    it('should have "unserialize"', () => {
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
