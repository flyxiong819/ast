#!/usr/bin/env node
// 修改源文件
// 执行命令: `node bin-3-modify.js demojs`
const recast = require("recast");

const {
  identifier: id,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression
} = recast.types.builders

recast.run(function (ast, printSource) {
  // 用来保存遍历到的全部函数名
  let funcIds = []
  recast.types.visit(ast, {
    // 目标：遍历所有的函数定义，将其改造为exports.xxx = () => {}
    visitFunctionDeclaration(path) {
      //获取遍历到的函数名、参数、块级域
      const node = path.node
      const funcName = node.id
      const params = node.params
      const body = node.body

      // 保存函数名
      funcIds.push(funcName.name)
      // 这是上一步推导出来的ast结构体
      const rep = expressionStatement(
        assignmentExpression(
          '=',
          memberExpression(id('exports'), funcName),
          arrowFunctionExpression(params, body)
        )
      );
      // 将原来函数的ast结构体，替换成推导ast结构体
      path.replace(rep)
      // 停止遍历
      return false
    }
  })
  // 目标：遍历所有函数调用，将其改为exports.xxx()
  recast.types.visit(ast, {
    // 遍历所有的函数调用
    visitCallExpression(path){
      const node = path.node;
      // 如果函数调用出现在函数定义中，则修改ast结构
      if (funcIds.includes(node.callee.name)) {
        node.callee = memberExpression(id('exports'), node.callee)
      }
      // 停止遍历
      return false
    }
  })
  // 打印修改后的ast源码
  printSource(ast)
})
