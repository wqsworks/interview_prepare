let str = "I'm?���drivingsss�??�to�?beijing�?��after�breakfasta"

const reg1 = /�+\?([a-z])/ig
// console.log(reg1.test(str))
const reg2 = /[^a-z']+/ig
str = str.replace(reg1, (a, g1) => {
  console.log(a, g1)
  return ' ' + g1.toUpperCase()
})
console.log(str) // 'I'm driving to Beijing after breakfast'

let a = '�?b'
console.log(a.toU)
