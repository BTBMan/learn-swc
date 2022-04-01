const { Visitor } = require('@swc/core/Visitor');

class MyVisitor extends Visitor {
  visitIdentifier(node) {
    return node;
  }
}

module.exports = {
  MyVisitor,
};
