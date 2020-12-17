// ajax的四部曲
function ajax (method, url, params, callback) {
  //对参数进行处理
  method = method.toUpperCase()
  let post_params = null
  let get_params = ''

  if (method === 'GET') {
    if (typeof params === 'object') {
      let tempArr = []
      for (let key in params) {
        tempArr.push(`${key}=${params[key]}`)
      }
      params = tempArr.join('&')
    }
    get_params = `?${params}`
  } else {
    post_params = params
  }

  //发请求
  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    callback(xhr.responseText)
  }

  xhr.open(method, url + get_params, false)
  if (method === 'POST')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

  xhr.send(post_params)
}

ajax('get', 'https://www.baidu.com', { id: 15 }, data => console.log(data))



function postJSON (url, data) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText), this)
        } else {
          var resJson = { code: this.status, response: this.response }
          reject(resJson, this)
        }
      }
    }

    xhr.send(JSON.stringify(data))
  })
}

// 1、fetch()返回的promise将不会拒绝http的错误状态，即使响应是一个HTTP 404或者500
// 2、在默认情况下 fetch不会接受或者发送cookies

