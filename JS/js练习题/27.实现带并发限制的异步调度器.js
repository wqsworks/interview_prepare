// class Scheduler {
//   add(promiseCreator) { ... }
//   // ...
// }

// const timeout = time => new Promise(resolve => {
//   setTimeout(resolve, time);
// })

// const scheduler = new Scheduler();

// const addTask = (time,order) => {
//   scheduler.add(() => timeout(time).then(()=>console.log(order)))
// }

// addTask(1000, '1');
// addTask(500, '2');
// addTask(300, '3');
// addTask(400, '4');

// // output: 2 3 1 4


class Scheduler {
  constructor() {
    this.queue = []
    this.MaxPromise = 2
    this.RunningPromise = 0
  }
  add (promiseCreator) {
    this.queue.push(promiseCreator)
  }
  start () {
    for (let i = 0; i < this.MaxPromise; i++) {
      this.runPromise()
    }
  }
  runPromise () {
    if (this.RunningPromise >= this.MaxPromise || this.queue.length == 0) {
      return
    }
    this.queue.shift()().then(() => {
      this.RunningPromise--
      this.runPromise()
    })
  }
}

const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time);
})

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
scheduler.start()