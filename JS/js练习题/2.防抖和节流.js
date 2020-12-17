// // // 防抖:debounce
// function debounce (fn, wait) {
//   console.log('11')
//   let timeout = null
//   return function () {
//     clearTimeout(timeout)
//     console.log(this)
//     timeout = setTimeout(() => {
//       fn.apply(this, arguments)
//     }, wait)
//   }
// }

// function throtte (fn, time) {
//   let activeTime = 0
//   return function () {
//     let current = Date.now()
//     if (current - activeTime > time) {
//       fn.apply(this, arguments)
//       activeTime = current
//     }
//   }
// }


// inp.addEventListener('input',
//   throtte(sayHi, 500)
// )




function debounce (fn, wait) {
  let timer = null
  return function anonymous (params) {
    if (timer) clearTimeout(timer)
    if (!timer) {
      fn.apply(this, arguments)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}
function sayHi () {
  console.log('hello')
  console.log(this)
}

function throtte (fn, wait) {
  let dataNow = 0
  return function anonymous () {
    let now = Date.now()
    if ((now - dataNow) > wait) {
      fn.apply(this, arguments)
      dataNow = now
    }
  }
}
let better = debounce(sayHi, 1000)
let nowdo = throtte(sayHi, 1000)
let inp = document.getElementById('inp')
// inp.addEventListener('input', better)
inp.addEventListener('input', nowdo)



// 防抖节流的高级版
// fn 是需要节流处理的函数
// wait 是时间间隔
function throttle (fn, wait) {

  // previous 是上一次执行 fn 的时间
  // timer 是定时器
  let previous = 0, timer = null

  // 将 throttle 处理结果当作函数返回
  return function (...args) {

    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()

    // ------ 新增部分 start ------ 
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔
    if (now - previous < wait) {
      // 如果小于，则为本次触发操作设立一个新的定时器
      // 定时器时间结束后执行函数 fn 
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        previous = now
        fn.apply(this, args)
      }, wait)
      // ------ 新增部分 end ------ 

    } else {
      // 第一次执行
      // 或者时间间隔超出了设定的时间间隔，执行函数 fn
      previous = now
      fn.apply(this, args)
    }
  }
}
