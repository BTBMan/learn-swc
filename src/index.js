import { foo } from './foo.js';
export * from './foo.js';

const test = () => {
  console.log('hello world!');

  foo();
};

test();
