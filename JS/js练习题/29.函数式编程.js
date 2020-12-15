// 在函数式编程当中有一个很重要的概念就是函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。 例如：
// const add1 = (x) => x + 1;
// const mul3 = (x) => x * 3;
// const div2 = (x) => x / 2;
// div2(mul3(add1(add1(0)))); //=>3
// ​
// 而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
// const operate = compose(div2, mul3, add1, add1)
// operate(0) //=>相当于div2(mul3(add1(add1(0)))) 
// operate(2) //=>相当于div2(mul3(add1(add1(2))))
// ​
// 简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写 



const add1 = x => x + 1;
const mul3 = x => x * 3;
const div2 = x => x / 2;

function compose (...funcs) {
  return function operate (x) {
    //一个函数都不传，直接返回初始值
    if (funcs.length === 0) return x;
    //只传递一个参数，判断是否是函数，是函数直接执行，不是函数直接返回初始值
    if (funcs.length === 1) return typeof funcs[0] === "function" ? funcs[0](x) : x;
    //后传递的函数先执行，reduceRight()从右开始先循环遍历
    return funcs.reduceRight(function (result, item) {
      //item不是函数直接跳过，返回值
      if (typeof item !== "function") return result;
      //item是函数就直接将上一次的返回结果当作实参传递给当前这个item函数
      return item(result);
    }, x);
  };
}
var operate = compose(div2, mul3, add1);
var result = operate(0);
console.log(result);//1.5