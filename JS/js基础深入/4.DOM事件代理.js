document.getElementById("father-id").onclick = function (event) {
  event = event || window.event
  let target = event.target
  //可以自己打印一下event.target.nodeName,看看是什么
  console.log(target)
  console.log(event)
  if (target.nodeName.toLowerCase() === 'xxx') {
    //事件内容
  }
}