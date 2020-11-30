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

// function sayHi () {
//   console.log('hello')
//   console.log(this)
// }
// let inp = document.getElementById('inp')
// // inp.addEventListener('input',
// //   debounce(sayHi, 500)
// // )
// inp.addEventListener('input',
//   throtte(sayHi, 500)
// )




function debounce (fn, wait) {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    },wait)
  }
}  



function throtte (fn,wait) {
  let activeTime = 0
  return function () {
    let time = Date.now()
    if (time - activeTime > wait) {
      fn.apply(this, arguments)
      activeTime = time
    }
  }
}