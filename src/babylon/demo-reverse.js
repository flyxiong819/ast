const babylon = require('babylon');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const typescript = require('typescript');

const code = `
  const nokk = 5;
  const abc = 99;
`;
// parse
const ast = babylon.parse(code);
console.log('%o', ast);

// transform
traverse(ast, {
  enter(path) {
    if (path.node.type === typescript.SyntaxKind.Identifier) {
      path.node.name = path.node.name
        .split('')
        .reverse()
        .join('');
    }
  }
});

// generate
const targetCode = generator(ast);
console.log(targetCode);
console.log(typescript.SyntaxKind.Identifier);

