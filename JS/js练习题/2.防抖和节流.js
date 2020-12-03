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