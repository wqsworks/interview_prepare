function jsonp (url, params_obj, callback) {
  //创建一个供后端返回数据调用的函数名
  let funcName = 'jsonp_' + Data.now() + Math.random().toString().substr(2, 5)

  //将参数拼接成字符串
  if (typeof params === 'object') {
    let temp = []
    for (let key in params) {
      temp.push(`${key}=${params[key]}`)
    }
    params = temp.join('&')
  }

  //在html中插入<script>资源请求标签
  let script = document.createElement('script')
  script.src = `${url}?${params}&callback=${funcName}`
  document.body.appendChild(script)

  //在本地设置供后端返回数据时调用的函数
  window[funcName] = data => {
    callback(data)

    delete window[funcName]
    document.body.removeChild(script)
  }
}

//使用方法
jsonp('http://xxxxxxxx', { id: 123 }, data => {
  //获取数据后的操作
})

console.log(Math.random().toString().substr(2, 5))
console.log(Math.random())

// 写一个jsonp函数
// 1.给后端调用的函数名字
// 2.读取params的参数
// 3.在html中插入script资源请求标签
// 4.在本地设置供后端返回数据时调用的函数
jsonp = function (url, params, callback) {

}