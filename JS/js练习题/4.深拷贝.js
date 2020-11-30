
// var b = {
//   hao: '222'
// }
var a = {
  name: "muyiy",
  book: {
    title: "You Don't Know JS",
    price: "45"
  },
  a1: undefined,
  a2: null,
  a3: 123,
}

a.circleRef = a

function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function deepClone (source, hash = new WeakMap()) {
  if (!isObject(source)) {
    return source
  }
  if (hash.has(source)) {
    return hash.get(source)
  }
  var target = Array.isArray(source) ? [] : {}
  hash.set(source, target)
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = deepClone(source[key], hash)
      } else {
        target[key] = source[key]
      }
    }
  }
  console.log(hash)
  return target
}


var b = deepClone(a);
console.log(b);
console.log(b.circleRef);


// let maparr = new Map()
// maparr.set(a, b)
// let setarr = new Set()
// setarr.add(2)
// setarr.add(a)
// setarr.add(b)
// console.log(maparr)
// console.log(setarr)
