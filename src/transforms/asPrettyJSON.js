// @flow
import type { JSONSerializer } from '../types'

export default function asPrettyJSON (): JSONSerializer {
  return {
    serialize (input) {
      return JSON.stringify(input, null, '  ')
    },

    unserialize (output) {
      return JSON.parse(output)
    }
  }
}

const built = asPrettyJSON()

asPrettyJSON.serialize = built.serialize
asPrettyJSON.unserialize = built.unserialize
