#!/usr/bin/env node
// 读取/遍历源文件
// 执行命令: `node bin-1-read.js demojs`

const recast = require('recast');

const TNT = recast.types.namedTypes;

recast.run(function(ast, printSource) {
  recast.visit(ast, {
    visitReturnStatement: function(path) {
      const node = path.node;
      if (TNT.ReturnStatement.check(node)) {
        // console.log('zenchen yes');
      } else {
        console.log('zenchen no');
      }
      printSource(node);
      console.log();
      this.traverse(path);
    },
    visitBlockStatement: function(path) {
      const node = path.node;
      printSource(node);
      console.log();
      this.traverse(path);
    },
  })
});
