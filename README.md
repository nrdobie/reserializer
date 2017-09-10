# Reserializer

[![Travis](https://img.shields.io/travis/nrdobie/reserializer.svg?style=flat-square)](https://github.com/nrdobie/reserializer)
[![Codecov](https://img.shields.io/codecov/c/github/nrdobie/reserializer.svg?style=flat-square)](https://github.com/nrdobie/reserializer)
[![Known Vulnerabilities](https://snyk.io/test/github/nrdobie/reserializer/badge.svg?style=flat-square)](https://snyk.io/test/github/snyk/goof)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)

Build smart serializers.

## Why Reserializer?

Data serialization is used to help send and store data when Objects can't be sent, such as HTTP requests, file and local storage, and IPC. Reserializer is designed to be a quick and easy solution to build serializers that are able to both serialize and unserialize data.

## Example

This is a quick example that converts dates, removes sensetive data, and converts to a JSON string, once created `serializer` has two methods `serializer.serialize` and `serializer.unserialize` that can recieve data and transform it accordingly.

``` javascript
import { asJSON, create, date, remove } from 'reserializer'

const serializer = create(
  asJSON,
  date('_meta.created'),
  date('_meta.updated'),
  remove('internalID')
)

const input = {
  internalID: 'something private',
  _meta: {
    created: new Date('2017-01-01T00:00:00'),
    updated: new Date('2017-01-01T12:00:00')
  }
}

const output = serializer.serialize(input) 
  // => '{"_meta":{"created":"2017-01-01T00:00:00","updated":"2017-01-01T12:00:00"}}'


const newInput = serializer.unserialize(output)
  // => {
  //   _meta: {
  //     created: new Date('2017-01-01T00:00:00'),
  //     updated: new Date('2017-01-01T12:00:00')
  //   }
  // }
```
## API

### Utilities

Utilities don't directly affect data but are used to help apply tranforms accordingly.

#### `create(...transforms)`

Recieves multiple tranforms and runs data through each transform returning the final version. A serializer from reserializer can accept and object or array, for arrays the serializer will loop through each item applying each transform. If `create` is given transforms `A`, `B`, and `C` as `create(A, B, C)`, on serialize, `create` will run the transforms in reverse order, i.e. `C -> B -> A`, and on unserialize, `create` will run the transforms in the given order, i.e. `A -> B -> C`.

#### `at(property, ...transforms)`

This utility will run tranfroms on a given property. It behaves the same as `create` with appling transforms and can handle arrays as well.

### Transforms

Transforms are used to convert the data.

#### `asJSON` / `asPrettyJSON`

This transform converts data between and object and JSON string. This should be the first transform in the list when creating a serializer. `asPrettyJSON` produces a nicely indented JSON structure and is recommened for debugging and development.

#### `date(property)`

This transform convertes dates between Date objects and ISO 8601 strings.

#### `remove(property)`

This transform removes a property from the object on both serialization and unserialization.

#### `rename(oldProperty, newProperty)`

This transform moves a property to a new path. Useful to help restructure data from an API request.
