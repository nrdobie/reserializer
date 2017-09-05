// @flow
export type Serializer<I, O> = {
  serialize: (input: I) => O,
  unserialize: (output: O) => I
}
