import isPlainObject from 'lodash.isplainobject'

export default function flatten (map, prefix) {
  return Object
    .keys(map)
    .filter(key => map.hasOwnProperty(key))
    .reduce((flatMap, key) => {
      const inputKey = prefix ? `${prefix}.${key}` : key
      const outputKey = map[key]

      if (isPlainObject(outputKey)) {
        const nestedMap = flatten(outputKey, inputKey)

        return {
          input: Object.assign({}, flatMap.input, nestedMap.input),
          output: Object.assign({}, flatMap.output, nestedMap.output)
        }
      }
      
      if (outputKey === true) {
        flatMap.input[inputKey] = inputKey
        flatMap.output[inputKey] = inputKey
      } else {
        flatMap.input[inputKey] = outputKey
        flatMap.output[outputKey] = inputKey
      }

      return flatMap
    }, {input: {}, output: {}})
}

