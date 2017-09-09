import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

const external = Object.keys(pkg.dependencies)

export default {
  input: 'src/index.js',
  external,
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
