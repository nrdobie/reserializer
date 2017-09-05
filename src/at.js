// @flow
import toPath from 'lodash.topath'
import { getIn, setIn } from 'timm'

import create, { CREATE_ID } from './create'

import type { Path, Serializer } from './types'

export default function at (property: Path, ...serializers: Array<Serializer>): Serializer {
  const path = Array.isArray(property) ? property : toPath(property)
  
  let serializer
  if (serializers.length === 1 && CREATE_ID in serializers[0]) {
    serializer = serializers[0]
  } else {
    serializer = create(...serializers)
  }

  return {
    serialize (input) {
      const oldValue = getIn(input, path)

      if (!oldValue) {
        return input
      }

      const nextValue = serializer.serialize(oldValue)

      return setIn(input, path, nextValue)
    },

    unserialize (output) {
      const oldValue = getIn(output, path)

      if (!oldValue) {
        return output
      }

      const nextValue = serializer.unserialize(oldValue)

      return setIn(output, path, nextValue)
    },
  }
}
