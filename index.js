const { transform, parse } = require('@swc/core');
const { readFileSync } = require('fs');
const ConsoleStripper = require('./plugins/PluginStripConsole.js');

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
    plugin: (m) => {
      return new ConsoleStripper().visitProgram(m);
    },
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
