const { transform, parse, plugins } = require('@swc/core');
const { readFileSync } = require('fs');
const { ConsoleStripper } = require('./plugins/PluginStripConsole.js');
const { MyVisitor } = require('./plugins/MyVisitor');

const getFileCode = (file = './src/index.js') => {
  return readFileSync(file, { encoding: 'utf-8' });
};

const code = getFileCode();

// 把代码进行转换
const transformCode = () => {
  transform(code, {
    jsc: {
      parser: {
        syntax: 'ecmascript',
      },
    },
    // for single plugin
    // plugin: (m) => new ConsoleStripper().visitProgram(m),
    // for multiple plugins
    plugin: plugins([
      (m) => {
        return new ConsoleStripper().visitProgram(m);
      },
      (m) => {
        return new MyVisitor().visitProgram(m);
      },
    ]),
  }).then((output) => {
    console.log(output);
  });
};

// 把代码解析为语法树
const parseCode = () => {
  parse(code, {
    syntax: 'ecmascript',
  }).then((module) => {
    console.log(module);
  });
};

transformCode();
// parseCode();
