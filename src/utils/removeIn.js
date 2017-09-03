import isPlainObject from 'lodash.isplainobject'
import toPath from 'lodash.topath'

import remove from './remove'

export default function removeIn (obj, property) {
  const path = Array.isArray(property) ? property : toPath(property)

  const key = path.slice(0, 1)
  const subPath = path.slice(1)

  // Check if object has the key
  if (!obj.hasOwnProperty(key)) {
    return obj
  }

  const value = obj[key]

  // Check if at the end of the path.
  if (subPath.length === 0 || !isPlainObject(value)) {
    return remove(obj, key)
  }

  // Remove sub path
  const nextValue = removeIn(value, subPath)

  // If no changes return object
  if (nextValue === value) {
    return obj
  }

  // Check for sub keys
  const valueHasKeys = Object.keys(nextValue).filter(key => nextValue.hasOwnProperty(key)).length !== 0

  if (valueHasKeys) {
    return Object.assign({}, obj, {[key]: nextValue})
  } else {
    return remove(obj, key)
  }
}
