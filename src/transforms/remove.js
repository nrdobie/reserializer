// @flow
import toPath from 'lodash.topath'
import { getIn } from 'timm'

import removeIn from '../utils/removeIn'

import type { Path, Serializer } from '../types'

export default function remove (property: Path): Serializer {
  const path = Array.isArray(property) ? property : toPath(property)

  return {
    serialize (input) {
      const oldValue = getIn(input, path)

      if (oldValue) {
        return removeIn(input, path)
      }

      return input
    },

    unserialize (output) {
      const oldValue = getIn(output, path)

      if (oldValue) {
        return removeIn(output, path)
      }

      return output
    }
  }
}
