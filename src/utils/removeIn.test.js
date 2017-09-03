import cloneDeep from 'lodash.clonedeep'

import removeIn from './removeIn'

describe('removeIn', () => {
  describe('with string patern', () => {
    let testObj

    beforeEach(() => {
      testObj = {
        a: 1,
        b: {
          c: 2,
          d: 3
        },
        e: {
          f: {
            g: 4
          }
        }
      }
    })

    it('should handle not having the element', () => {
      expect(removeIn(testObj, 'e.f.z')).toBe(testObj)
    })

    it('should handle root level remove', () => {
      const expectObj = cloneDeep(testObj)
      delete expectObj.a

      expect(removeIn(testObj, 'a')).toEqual(expectObj)
    })

    it('should handle root level remove with sub properties', () => {
      const expectObj = cloneDeep(testObj)
      delete expectObj.b

      expect(removeIn(testObj, 'b')).toEqual(expectObj)
    })

    it('should remove with sibiling properties', () => {
      const expectObj = cloneDeep(testObj)
      delete expectObj.b.c

      expect(removeIn(testObj, 'b.c')).toEqual(expectObj)
    })

    it('should remove empty objects', () => {
      const expectObj = cloneDeep(testObj)
      delete expectObj.e

      expect(removeIn(testObj, 'e.f.g')).toEqual(expectObj)
    })
  })

  describe('with array patern', () => {
    let testObj

    beforeEach(() => {
      testObj = {
        a: 1,
        b: {
          c: 2,
          d: 3
        },
        e: {
          f: {
            g: 4
          }
        }
      }
    })

    it('should handle not having the element', () => {
      expect(removeIn(testObj, ['e', 'f', 'z'])).toBe(testObj)
    })

    it('should handle root level remove', () => {
      const expectObj = cloneDeep(testObj)
      delete expectObj.a

      expect(removeIn(testObj, ['a'])).toEqual(expectObj)
    })

    it('should handle root level remove with sub properties', () => {
      const expectObj = cloneDeep(testObj)
      delete expectObj.b

      expect(removeIn(testObj, ['b'])).toEqual(expectObj)
    })

    it('should remove with sibiling properties', () => {
      const expectObj = cloneDeep(testObj)
      delete expectObj.b.c

      expect(removeIn(testObj, ['b', 'c'])).toEqual(expectObj)
    })

    it('should remove empty objects', () => {
      const expectObj = cloneDeep(testObj)
      delete expectObj.e

      expect(removeIn(testObj, ['e', 'f', 'g'])).toEqual(expectObj)
    })
  })
})
