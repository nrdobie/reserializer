// @flow
import type { Serializer } from './types'

export const CREATE_ID = 'CREATE_ID'

export default function create(...transforms: Array<Serializer>): Serializer {
  return {
    serialize (input) {
      const runner = (rawItem) => {
        // Make copy of transforms
        const tempTransforms = transforms.slice()
  
        let serializedItem = rawItem
        let transform
  
        while(transform = tempTransforms.pop()) {
          serializedItem = transform.serialize(serializedItem)
        }

        return serializedItem
      }

      if (Array.isArray(input)) {
        return input.map(item => runner(item))
      } else {
        return runner(input)
      }
    },

    unserialize (input) {
      const runner = (rawItem) => {
        // Make copy of transforms
        const tempTransforms = transforms.slice()
        tempTransforms.reverse()
  
        let serializedItem = rawItem
        let transform
  
        while(transform = tempTransforms.pop()) {
          serializedItem = transform.unserialize(serializedItem)
        }

        return serializedItem
      }

      if (Array.isArray(input)) {
        return input.map(item => runner(item))
      } else {
        return runner(input)
      }
    },

    [CREATE_ID]: true
  }
}
