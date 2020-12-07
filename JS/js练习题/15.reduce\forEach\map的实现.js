// Array.prototype.myReduce = function (fn, init_val) {
//   let [val, idx] = init_val ? [init_val, 0] : [this[0], 1]//设置初始值
//   for (let i = idx, len = this.length; i < len; i++) {
//     val = fn(val, this[i], i, this)//循环并迭代结果
//   }
//   return val
// }


Array.prototype.myReduce = function (fn, init_val) {
  let [val, index] = init_val ? [init_val, 0] : [this[0], 1]
  for (let i = index; i < this.length; i++) {
    val = fn(val, this[i], i, this)
  }
  return val
}
console.log([1, 2, 3, 4, 5].myReduce((pre, item) => pre + item, 0)) // 15



Array.prototype.myForEach = function (fn, temp_this) {
  for (let i = 0, len = this.length; i < len; i++) {
    fn.call(temp_this, this[i], i, this)//循环数组元素,为回调函数传入参数
  }
}

// Array.prototype.myForEach = function (fn, temp_this) {
//   for (let i = 0; i < this.length; i++) {
//     fn.call(temp_this, this[i], i, this)
//   }
// }
let arr = [1, 3, 5, 7, 9]
arr.myForEach(function (item, index, arr) {
  console.log(this)
}, 15)



// Array.prototype.myMap = function (callback) {
//   if (!Array.isArray(this) || !this.length || typeof callback !== 'function') {
//     return []
//   } else {
//     let result = [];
//     for (let index = 0; index < this.length; index++) {
//       const element = this[index];
//       result.push(callback(element, index, this))
//     }
//     return result
//   }
// }

Array.prototype.myMap = function (fn) {
  if (!Array.isArray(this) || !this.length || typeof fn !== 'function') {
    return []
  } else {
    let result = []
    for (let i = 0; i < this.length; i++) {
      let tempRes = fn(this[i], i, this)
      result.push(tempRes)
    }
    return result
  }
}

let arr = [1, 3, 5, 7, 9]
let res = arr.myMap(item => {
  console.log(item)
  return item * 2
})
console.log(res)