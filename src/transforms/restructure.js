import toPath from 'lodash.topath'
import { getIn, setIn } from 'timm'

import flatten from '../utils/flatten'

import type { Path, Serializer } from '../types'

type RestructureMap = {
  [string]: Path | RestructureMap
}

const remap = (rules) => (obj) =>
  Object
    .keys(rules)
    .filter(key => rules.hasOwnProperty(key))
    .reduce((remappedObj, inProperty) => {
      const inPath = toPath(inProperty)
      const outPath = toPath(rules[inProperty])

      const value = getIn(obj, inPath)

      if (value == null) {
        return remappedObj
      }

      return setIn(remappedObj, outPath, value)
    }, {})

export default function restructure (map: RestructureMap): Serializer {
  const flattenedMap = flatten(map)

  return {
    serialize: remap(flattenedMap.input),
    unserialize: remap(flattenedMap.output)
  }
}
