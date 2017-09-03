export default function remove (obj, key) {
  if (!obj.hasOwnProperty(key)) {
    return obj
  }

  const shallowClone = Object.assign({}, obj)

  delete shallowClone[key]

  return shallowClone
}
