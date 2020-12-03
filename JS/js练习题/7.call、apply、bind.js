// 如果context是基本类型的值 则默认不能设置属性
Function.prototype.call = function call (context, ...args) {
  context = context || window
  // 处理基本数据类型
  if (!(/^(function|object)$/.test(typeof context))) {
    if ((/^(symbol|bigint)$/.test(typeof context))) {
      context = Object(context)
    } else {
      context = new context.constructor(context)
    }
  }

  let key = Symbol(' '), result;
  context[key] = this
  result = context[key](...args)
  delete context[key]
  return result
}
let obj = {
  name: 'obj'
}
function func (x, y) {
  console.log(this)
  return x + y
}
console.log(func.call(1, 10, 20))



~function () {
  function bind (context, ...outArgs) {
    context = context || window
    let _this = this
    return function anonymous (...innerArgs) {
      let Args = outArgs.concat(innerArgs)
      // console.log(Args)
      _this.call(context, ...Args)
    }
  }
  Function.prototype.bind = bind
}()
var obj = {
  name: 'zhufeng'
}
function func () {
  console.log(this, arguments);
}
let a = func.bind(obj, 100, 200)
a(3)





// 终极练习题
// var name = '珠峰培训'
// function A (x, y) {
//   var res = x + y
//   console.log(res, this.name)
// }
// function B (x, y) {
//   var res = x - y
//   console.log(res, this.name)
// }
// B.call(A, 40, 30) // => 10, 'A'
// B.call.call.call(A, 20, 10)//  => NAN  undefined
// /*
// context: A   this: B.call.call   20,10
// A.$$ = B.call.call (20,10)
// context: 20 this: A   10
// 20.A(10)
//     this: 20
// */
// Function.prototype.call(A, 60, 50) // 无输出
// /*
// context: A   this: Function.prototype   60 50
// A.Function.protype(60,50)
//  */
// Function.prototype.call.call.call(A, 40, 30) //
// /*
// context: A   this: Function.prototype.call.call   60 50
// A.Function.protype.call.call(60,50)
// context: 60  this: A     50
// 60.A(50)
//  */

~function () {
  Function.prototype.bind = function (context, ...outArgs) {
    context = context || window
    let _this = this
    return function anonymous (...innerArgs) {
      let args = outArgs.concat(innerArgs)
      _this.call(args)
    }
  }
}()




