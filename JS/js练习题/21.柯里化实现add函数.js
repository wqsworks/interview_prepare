function curry (fn, args) {
  var length = fn.length;
  args = args || [];
  return function (...args1) {

    _args = [...args, ...args1]
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    }
    else {
      return fn.apply(this, _args);
    }
  }
}


var fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});
// console.log(fn)

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]




const curry = (fn, ...args) => {
  // 函数的参数个数可以直接通过函数数的.length属性来访问
  if (fn.length === args.length) {
    console.log(args.length, '----')
    console.log(fn.length, '++++')
    console.log(fn)
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    return fn.call(fn, ...args);
  }

  // 传入的参数小于原始函数fn的参数个数时
  // 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
  return (...rest) => curry(fn, ...args, ...rest);
};
const add = (x, y, z) => x + y + z;
console.log(add.length)
const curryAdd = curry(add);

console.log(curryAdd(1, 2, 3))
// console.log(curryAdd(1, 2)(3))
// console.log(curryAdd(1)(2, 3))
// console.log(curryAdd(1)(2)(3))









// 自己实现版本
const add = (x, y, z) => x + y + z
const curry = function (fn, ...args) {
  if (fn.length == args.length) {
    return fn.call(fn, ...args)
  }
  return (...args1) => curry(fn, ...args, ...args1)
}
let fn = curry(add)

console.log(fn(1, 2, 3))