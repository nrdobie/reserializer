import flatten from './flatten'

describe('flatten', () => {
  it('should return an object with input and output keys', () => {
    const flattenedMap = flatten({})

    expect(flattenedMap).toHaveProperty('input')
    expect(flattenedMap).toHaveProperty('output')
  })

  it('should map the input and output on a single property', () => {
    const map = {
      test: 'newTest'
    }

    const expectedFlattenedMap = {
      input: {
        test: 'newTest'
      },
      output: {
        newTest: 'test'
      }
    }

    expect(flatten(map)).toEqual(expectedFlattenedMap)
  })

  it('should map the input and output on multiple properties', () => {
    const map = {
      test: 'newTest',
      anotherProp: 'newAnotherProp'
    }

    const expectedFlattenedMap = {
      input: {
        test: 'newTest',
        anotherProp: 'newAnotherProp'
      },
      output: {
        newTest: 'test',
        newAnotherProp: 'anotherProp'
      }
    }

    expect(flatten(map)).toEqual(expectedFlattenedMap)
  })

  it('should handle same name on a property', () => {
    const map = {
      test: true
    }

    const expectedFlattenedMap = {
      input: {
        test: 'test'
      },
      output: {
        test: 'test'
      }
    }

    expect(flatten(map)).toEqual(expectedFlattenedMap)
  })

  it('should map the input and output on a nested input property', () => {
    const map = {
      _meta: {
        test: 'newTest'
      }
    }

    const expectedFlattenedMap = {
      input: {
        '_meta.test': 'newTest'
      },
      output: {
        newTest: '_meta.test'
      }
    }

    expect(flatten(map)).toEqual(expectedFlattenedMap)
  })

  it('should map the input and output on a nested output property', () => {
    const map = {
      test: '_meta.newTest'
    }

    const expectedFlattenedMap = {
      input: {
        test: '_meta.newTest'
      },
      output: {
        '_meta.newTest': 'test'
      }
    }

    expect(flatten(map)).toEqual(expectedFlattenedMap)
  })
})
