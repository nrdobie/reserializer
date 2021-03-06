// @flow
import type { JSONSerializer } from '../types'

export default function asJSON (): JSONSerializer {
  return {
    serialize (input) {
      return JSON.stringify(input)
    },

    unserialize (output) {
      return JSON.parse(output)
    }
  }
}

const built = asJSON()

asJSON.serialize = built.serialize
asJSON.unserialize = built.unserialize
