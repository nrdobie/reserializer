import toPath from 'lodash.topath'
import { getIn, setIn } from 'timm'

import removeIn from '../utils/removeIn'

export default function rename(originalProperty, newProperty) {
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

    unserialize (input) {
      const oldValue = getIn(input, newPath)

      if (oldValue) {
        let output = removeIn(input, newPath)
        output = setIn(output, originalPath, oldValue)

        return output
      }

      return input
    }
  }
}
