// @flow
import toPath from 'lodash.topath'
import { getIn, setIn } from 'timm'

import type { Path, Serializer } from '../types'

export default function date (property: Path): Serializer {
  const path = Array.isArray(property) ? property : toPath(property)

  return {
    serialize (input) {
      const dateObj = getIn(input, path)

      if (dateObj instanceof Date) {
        const dateStr = dateObj.toISOString()

        return setIn(input, path, dateStr)
      }

      return input
    },

    unserialize (output) {
      const dateStr = getIn(output, path)

      const dateObj = new Date(dateStr)

      // If date is not a number, then the string wasn't a valid date
      if (isNaN(dateObj)) {
        return output
      }

      return setIn(output, path, dateObj)
    }
  }
}
