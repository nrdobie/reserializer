import toPath from 'lodash.topath'
import { getIn, setIn } from 'timm'

export default function date(property) {
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

    unserialize (input) {
      const dateStr = getIn(input, path)

      const dateObj = new Date(dateStr)

      // If date is not a number, then the string wasn't a valid date
      if (isNaN(dateObj)) {
        return input
      }

      return setIn(input, path, dateObj)
    }
  }
}
