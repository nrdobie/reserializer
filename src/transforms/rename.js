// @flow
import toPath from 'lodash.topath'
import { getIn, setIn } from 'timm'

import removeIn from '../utils/removeIn'

import type { Path, Serializer } from '../types'

export default function rename (originalProperty: Path, newProperty: Path): Serializer {
  const originalPath = Array.isArray(originalProperty) ? originalProperty : toPath(originalProperty)
  const newPath = Array.isArray(newProperty) ? newProperty : toPath(newProperty)

  return {
    serialize (input) {
      const oldValue = getIn(input, originalPath)

      if (oldValue) {
        let output = removeIn(input, originalPath)
        output = setIn(output, newPath, oldValue)

        return output
      }

      return input
    },

    unserialize (output) {
      const oldValue = getIn(output, newPath)

      if (oldValue) {
        let input = removeIn(output, newPath)
        input = setIn(input, originalPath, oldValue)

        return input
      }

      return output
    }
  }
}
