// function myInterval (fn, interval, ...args) {
//   let context = this
//   setTimeout(() => {
//     fn.apply(context, args)
//     myInterval(fn, interval, ...args)//别忘了为它传入参数
//   }, interval)
// }







function myInterval (fn, interval, ...args) {
  let context = this
  setTimeout(() => {
    fn.call(context, ...args)
    myInterval(fn, interval, ...args)
  }, interval)
}






myInterval((num) => console.log(num), 500, 10)

