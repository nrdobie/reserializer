import toPath from 'lodash.topath'
import { getIn, setIn } from 'timm'

import create, { CREATE_ID } from './create'

export default function at (property, ...serializers) {
  const path = Array.isArray(property) ? property : toPath(property)
  
  let serializer
  if (serializers.length === 1 && serializers[0][CREATE_ID]) {
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
    unserialize (input) {
      const oldValue = getIn(input, path)

      if (!oldValue) {
        return input
      }

      const nextValue = serializer.unserialize(oldValue)

      return setIn(input, path, nextValue)
    },
  }
}
