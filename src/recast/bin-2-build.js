#!/usr/bin/env node
// 构造一个箭头函数：exports.add = () = {}
// 执行命令: `node bin-2-build.js demojs`

const recast = require('recast');

const {
  identifier,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression,
  blockStatement,  
} = recast.types.builders;

recast.run(function(ast, printSource) {
  // 一个块级域 {}
  console.log('\n\nstep1:');
  printSource(blockStatement([]));

  // 一个箭头函数 () => {}
  console.log('\n\nstep2:');
  printSource(arrowFunctionExpression([], blockStatement([])));

  // add赋值为箭头函数 add = () => {}
  console.log('\n\nstep3:');
  printSource(assignmentExpression('=', identifier('add'), arrowFunctionExpression([], blockStatement([]))));

  // exports.add赋值为箭头函数 exports.add = () => {}
  console.log('\n\nstep4:');
  printSource(expressionStatement(assignmentExpression('=', memberExpression(identifier('exports'), identifier('add')), arrowFunctionExpression([], blockStatement([])))));

});
