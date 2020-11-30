// function _parseInt (str, radix) {
//   let str_type = typeof str;
//   let res = 0;
//   if (str_type !== 'string' && str_type !== 'number') {
//     // 如果类型不是 string 或 number 类型返回NaN
//     return NaN
//   }

//   // 字符串处理
//   str = String(str).trim().split('.')[0]
//   console.log(str)
//   let length = str.length;
//   if (!length) {
//     // 如果为空则返回 NaN
//     return NaN
//   }

//   if (!radix) {
//     // 如果 radix 为0 null undefined
//     // 则转化为 10
//     radix = 10;
//   }
//   if (typeof radix !== 'number' || radix < 2 || radix > 36) {
//     return NaN
//   }

//   for (let i = 0; i < length; i++) {
//     console.log(str, 28)
//     let arr = str.split('').reverse().join('');
//     console.log(arr)
//     res += Math.floor(arr[i]) * Math.pow(radix, i)
//   }

//   return res;
// }


// let res = _parseInt('234', 2)
// console.log(res)


// let reww = 'asd'
// let sasda = reww.split('').reverse()
// console.log(sasda)
// console.log(reww)


const _parseInt = (str, radix) => {
  // 不为string类型先转化为string 类型
  if (typeof str !== 'string') str = String(str)

  // 删除首尾空白
  str = str.trim()

  // 正则匹配[+|-]?[0]?[Xx]?[0-9a-fA-F]+
  const regex = /^(?<fuhao>[\+|\-]*)(?<radix>[0]?[Xx]?)(?<num>[0-9a-fA-F]+)/

  // 无法匹配返回NaN
  if (!regex.test(str)) return NaN

  // 匹配出符号、进制、数字三个分组
  const groups = str.match(regex).groups

  // radix的有效范围为 2-36
  if (radix && (radix < 2 || radix > 36)) return NaN

  // 如果没有指定radix, radix 会有以下默认值
  if (!radix) {
    if (groups.radix.toUpperCase() === '0X') radix = 16
    else if (groups.radix === '0') radix = 8
    else radix = 10
  }

  // 挨个字符串解析，如果遇到无法解析时则停止解析，返回已经解析好的整数
  let splitArr = groups.num.split('')
  const arr = []
  for(let i = 0; i < splitArr.length; i++) {
    // 根据charCode来做转行为实际数据, 0-9为[48-57],A-F为[65-70]
    const charCode = splitArr[i].toUpperCase().charCodeAt()
    let num 

    // 字符为[A-F]时, 实际数字为charCode -55
    if(charCode >= 65) num = charCode - 55

    // 字符为[0-9]时, 实际数字为charCode - 48
    else num = charCode - 48

    // 当实际数字大于radix时, 无法解析则停止字符串遍历
    if (num > radix) {
      break
    } else {
      arr.push(num)
    }
  }

  const len = arr.length
  // 当实际数字数组长度为0时, 返回NaN
  if(!len) return NaN
  let result = 0

  // 依次解析实际数字数组, 组合成真正的数字
  for(let i = 0; i < len; i++) {
    const num = arr[i] * Math.pow(radix, len - i - 1)
    result += num
  }

  // 算法匹配到的正负号
  return result * (groups.fuhao === '-' ? -1 : 1)
}
