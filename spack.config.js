const { config } = require('@swc/core/spack');

module.exports = config({
  entry: {
    web: __dirname + '/src/index.js',
  },
  output: {
    path: __dirname + '/dist',
  },
  module: {},
  options: {
    module: {
      type: 'umd',
      globals: {
        foo: 'afoo',
      },
    },
  },
});
