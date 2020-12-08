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