import { transform, parse } from '@swc/core';
import { readFileSync } from 'fs';

const getFileCode = (file = './src/index.js') => {
  return readFileSync(file, { encoding: 'utf-8' });
};

const code = getFileCode();

const transformCode = () => {
  transform(code, {
    jsc: {
      parser: {
        syntax: 'ecmascript',
      },
    },
  }).then((output) => {
    console.log(output);
  });
};

const parseCode = () => {
  parse(code, {
    syntax: 'ecmascript',
  }).then((module) => {
    console.log(module);
  });
};

parseCode();
