// @flow
export type Serializer = {
  serialize: (input: {}) => {},
  unserialize: (output: {}) => {}
}

export type JSONSerializer = {
  serialize: (input: {}) => string,
  unserialize: (output: string) => {}
}

export type Path = string | number | Array<string | number>
