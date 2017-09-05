export default function asJSON () {
  return {
    serialize (input) {
      return JSON.stringify(input)
    },

    unserialize (input) {
      return JSON.parse(input)
    }
  }
}

const built = asJSON()

asJSON.serialize = built.serialize
asJSON.unserialize = built.unserialize
