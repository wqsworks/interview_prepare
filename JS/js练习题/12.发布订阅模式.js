// class EventEmitter {
//   constructor() {
//     // 初始值为空对象
//     this.listeners = Object.create(null)
//   }
//   // 注册事件
//   on = (event, listener) => {
//     // this.bindEvent(event, listener, false)
//     if (!event || !listener) {
//       return
//     }
//     if (this.listeners[event]) {
//       //如果有就放一个新的
//       this.listeners[event].push(listener)
//     } else {
//       //如果没有就创建一个数组
//       this.listeners[event] = [listener]
//     }
//   }

//   // 只订阅一次
//   once = (event, listener) => {
//     // this.bindEvent(event, listener, true)
//     function one () {
//       // 在one函数运行原来的函数，只有将one清空
//       console.log(arguments)
//       listener.apply(this, arguments)
//       // 先绑定 执行后再删除
//       this.off(event)
//     }
//     this.on(event, one)
//     //此时emit触发会执行此函数，会给这个函数传递rest参数
//   }

//   // 发布事件
//   emit = (event, ...args) => {
//     if (!this.hasBind(event)) {
//       console.warn(`this event: ${event} don't has bind listener.`)
//       return
//     }

//     this.listeners[event].forEach(listener => listener.call(this, ...args))
//   }

//   // 取消订阅
//   off = (event, listener) => {
//     if (!this.hasBind(event)) {
//       console.warn(`this event: ${event} don't exist.`)
//       return
//     }

//     // remove all listener
//     if (!listener) {
//       delete this.listeners[event]
//       return
//     }

//     // remove specific listener
//     this.listeners[event] = this.listeners[event].filter(item => item !== listener)
//   }

//   hasBind = event => {
//     return this.listeners[event]
//       && this.listeners[event].length
//   }
// }

// 测试
// const baseEvent = new EventEmitter()
// function cb (value) {
//   console.log("hello " + value)
// }
// baseEvent.once("click", cb)
// // baseEvent.off("click")
// baseEvent.emit("click", '2020')
// // hello 2020
// console.log(baseEvent.listeners)



class EventContent {
  constructor() {
    this.list = Object.create(null)
  }
  // 订阅事件
  on (event, fn) {
    if (!event || !fn) {
      return
    }
    (this.list[event] || (this.list[event] = [])).push(fn)
  }
  // 发布事件
  emit (event, ...args) {

    if (this.list[event] && this.list[event].length) {
      this.list[event].forEach(fn => {
        fn.call(this, ...args)
      })
    }
  }
  // 只订阅一次
  once (event, fn) {
    function one () {
      fn.apply(this, arguments)
      this.off(event)
    }
    this.on(event, one)
  }
  // 取消订阅
  off (event, fn) {
    if (!fn) {
      delete this.list[event]
      return
    }
    this.list[event].filter(item => item != fn)
  }
}

const baseEvent = new EventContent()
function cb (value) {
  console.log("hello " + value)
}
baseEvent.on("click", cb)
// baseEvent.off("click")
baseEvent.emit("click", '2020')
// hello 2020
console.log(baseEvent.list)
