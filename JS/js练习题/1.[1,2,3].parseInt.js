https://muyiy.cn/question/js/2.html

console.log(['1', '2', '3'].map(parseInt))


// [1,NaN,NaN]
// parseInt(string, radix) -> map(parseInt(value, index))
/*  first iteration (index is 0): */ parseInt("1", 0); // 1
/* second iteration (index is 1): */ parseInt("2", 1); // NaN
/*  third iteration (index is 2): */ parseInt("3", 2); // NaN


/*
考察对于map的理解和parseInt的理解

map 会自动执行map后面的callbacks, 将callbacks函数执行的返回值作为一个新的数组返回
foreach 直接改变原数组

 */


// 变形
let unary = fn => val => fn(val)
let parse = unary(parseInt)
console.log(['1.1', '2', '0.3'].map(parse))
