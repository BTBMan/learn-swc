const { CallExpression, Expression, transformSync } = require('@swc/core');
const { Visitor } = require('@swc/core/Visitor.js');

class ConsoleStripper extends Visitor {
  visitCallExpression(expression) {
    if (expression.callee.type !== 'MemberExpression') {
      return expression;
    }

    if (
      expression.callee.object.type === 'Identifier' &&
      expression.callee.object.value === 'console'
    ) {
      if (expression.callee.property.type === 'Identifier') {
        return {
          type: 'UnaryExpression',
          span: expression.span,
          operator: 'void',
          argument: {
            type: 'NumericLiteral',
            span: expression.span,
            value: 0,
          },
        };
      }
    }

    return expression;
  }
}

module.exports = {
  ConsoleStripper,
};
