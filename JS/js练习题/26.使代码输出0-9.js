// 改造下面的代码，使之输出0 - 9
for (var i = 0; i < 10; i++) {
  setTimeout((i) => {
    console.log(i);
  }, 1000, i)
}


// 解法一：
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000)
}
// 解法二：
for (var i = 0; i < 10; i++) {
  ((i) => {
    setTimeout(() => {
      console.log(i);
    }, 1000)
  })(i)
}
// 解法三： 利用 setTimeout 函数的第三个参数，会作为回调函数的第一个参数传入
for (var i = 0; i < 10; i++) {
  setTimeout(console.log, 1000, i)
}

// 解法四： 利用 bind 函数部分执行的特性
for (var i = 0; i < 10; i++) {
  setTimeout(console.log.bind(Object.create(null), i), 1000)
}