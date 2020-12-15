// 1.
console.log(a, b, c);
var a = 12,
  b = 13,
  c = 14;
function fn (a) {
  console.log(a, b, c);
  a = 100;
  c = 200;
  console.log(a, b, c);
}
b = fn(10);
console.log(a, b, c);
// 答案：
// undefined undefined undefined
// 10 13 14
// 100 13 200
// 12 undefined 200





// 2.
var i = 0;
function A () {
  var i = 10;
  function x () {
    console.log(i);
  }
  return x;
}
var y = A();
y();
function B () {
  var i = 20;
  y();
}
B();
// 答案：  函数的执行上下文在定义的时候就确定了
//  10 
//  10





// 3
var a = 1;
var obj = {
  "name": "tom"
}
function fn () {
  var a2 = a;
  obj2 = obj;
  a2 = a;
  obj2.name = 'jack';
}
fn();
console.log(a);
console.log(obj);

// 答案
// 1
// {
//   "name": "jack"
// }


// 4
var a = 1;
function fn (a) {
  console.log(a)
  var a = 2;
  function a () { }
}
fn(a);

// 答案  变量提升也有优先级, 函数声明 > arguments > 变量声明
// [Function: a]

// 4 +
console.log(a)
function a () {

}
var a = 1
// 答案 [Function: a]
// 函数式js世界中的一等公民