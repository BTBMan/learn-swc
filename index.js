const { transform, parse, plugins, bundle } = require("@swc/core");
const { readFileSync } = require("fs");
const { ConsoleStripper } = require("./plugins/PluginStripConsole.js");
const { MyVisitor } = require("./plugins/MyVisitor");

const getFileCode = (file = "./src/foo.js") => {
  return readFileSync(file, { encoding: "utf-8" });
};

const code = getFileCode();

// 把代码进行转换
const transformCode = () => {
  transform(code, {
    jsc: {
      parser: {
        syntax: "ecmascript",
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
    syntax: "ecmascript",
  }).then((module) => {
    console.log(module);
  });
};

bundle({
  entry: "./src/index.ts",
  options: {
    jsc: {
      parser: {
        syntax: "typescript",
      },
    },
  },
}).then((a) => {
  console.log(a);
});

// transformCode();
// parseCode();
