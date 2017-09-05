export default function asPrettyJSON () {
  return {
    serialize (input) {
      return JSON.stringify(input, null, '  ')
    },

    unserialize (input) {
      return JSON.parse(input)
    }
  }
}

const built = asPrettyJSON()

asPrettyJSON.serialize = built.serialize
asPrettyJSON.unserialize = built.unserialize
