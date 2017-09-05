import toPath from 'lodash.topath'
import { getIn } from 'timm'

import removeIn from '../utils/removeIn'

export default function remove(property) {
  const path = Array.isArray(property) ? property : toPath(property)

  return {
    serialize (input) {
      const oldValue = getIn(input, path)

      if (oldValue) {
        return removeIn(input, path)
      }

      return input
    },

    unserialize (input) {
      const oldValue = getIn(input, path)

      if (oldValue) {
        return removeIn(input, path)
      }

      return input
    }
  }
}
