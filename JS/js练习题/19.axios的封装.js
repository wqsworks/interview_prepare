(function () {
  /* 核心封装 */
  class MyAJax {
    constructor(config = {}) {
      // 请求拦截器发生在发送请求之间
      let requestInterceptors = ajax.interceptors.request.pond[0]
      if (typeof requestInterceptors === 'function') {
        config = requestInterceptors()
      }
      this.config = config
      this.isGET = /^(GET|HEAD|DELETE|OPTIONS)$/i.test(config.method)
      return this.init()
    }
    init () {
      let {
        method,
        validateStatus,
        timeout,
        withCredentials
      } = this.config

      //  响应拦截器
      let responseInterceptors = ajax.interceptors.response.pond[0]
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest
        xhr.open(method, this.handleURL())
        xhr.timeout = timeout
        xhr.withCredentials = withCredentials
        this.handleHEADERA(xhr)
        xhr.onreadystatechange = () => {
          let flag = validateStatus(xhr.status)
          if (!flag) {
            // 请求失败
            reject({
              response: this.handleResponse(xhr, flag),
              message: xhr.response
            })
            return
          }
          // 请求成功
          if (xhr.readyState === 4) {
            resolve(this.handleResponse(xhr, flag))
          }
        }
        xhr.send(this.handleDATA)
      }).then(...responseInterceptors)
    }
    //  处理URL
    handleURL () {
      let {
        isGET,
        config: {
          baseURL,
          url,
          params
        }
      } = this
      url = baseURL + url
      if (isGET && params !== null && typeof params === 'object') {
        url += `${url.includes('?') ? '&' : '?'}+${paramsSerialize(params)}`
      }
      return url
    }
    //  处理DATA
    handleDATA () {
      let {
        isGET,
        config: {
          data,
          transformRequest
        }
      } = this
      if (isGET) return null
      typeof transformRequest === "function" ? data = transformRequest(data) : null
      return data
    }
    // 处理请求头
    handleHEADERA (xhr) {
      let { headers } = this.config
      if (!headers || typeof headers !== 'object') return
      for (let key in headers) {
        if (!headers.hasOwnProperty(key)) break
        xhr.setRequestHeader(key, headers(key))
      }
    }
    // 准备返回的结果
    handleResponse (xhr, flag) {
      let response = {
        status: xhr.status,
        statusText: xhr.statusText,
        request: xhr,
        config: this.config,
        headers: {},
        data: null
      }
      response.data = flag ? JSON.parse(xhr.responseText) : xhr.responseText
      let headers = xhr.getAllResponseHeaders()
      headers = headers.split(/\n|\t/)
      headers.forEach(item => {
        if (!item) return
        let [key, value] = item.split(':')
        response.headers[key] = value
      })
      return response
    }
  }


  //  暴露到全局的api
  //  拼接params方法
  function paramsSerialize (obj) {
    if (!obj || typeof obj !== "object") return obj
    let result = ``
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) break
      result += `&${key}=${obj[key]}`
    }
    result = result.substring(1)
    return result
  }
  //  合并config 
  function initParams (config = {}) {
    if (config.hasOwnProperty('headers')) {
      config.headers = Object.assign(ajax.defaults.headers, config.headers)
    }
    config = Object.assign(ajax.defaults, config)
    return config
  }

  //  ajax方法
  function ajax (config = {}) {
    config = initParams(config)
    return new MyAJax
  }
  // 默认参数配置
  ajax.defaults = {
    baseURL: '',
    url: '',
    headersL: {
      "Content-type": "application/json"
    },
    timeout: 0,
    withCredentials: false,
    method: 'get',
    params: null,
    data: null,
    transformRequest: data => {
      if (!data || typeof data != 'object') return data
      return JSON.stringify(data)
    },
    validateStatus: status => {
      return status >= 200 && status < 300
    }
  }

  // 拦截器
  function use (...params) {
    params = params.filter(item => typeof item === "function")
    this.pond = params
  }
  ajax.interceptors = {
    response: {
      use,
      pond: []
    },
    request: {
      use,
      pond: []
    }
  }

  ajax.interceptors.response.use()

  ['get', 'delete', 'head', 'options'].forEach(name => {
    ajax[name] = function (url = "", config = {}) {
      config.method = name
      config.url = url
      return ajax(config)
    }
  })
  ['post', 'put'].forEach(name => {
    ajax[name] = function (url = "", data = {}, config = {}) {
      config.method = name
      config.url = url
      config.data = data
      return ajax(config)
    }
  })
  window._ajax = ajax
  window._paramsSerialize = paramsSerialize
})()

// _ajax([config])
// _ajax.get(url,config)
// _ajax.post(url,data,config)
// _ajax.defaults.xxx = xxx
// _ajax.interceptors
//  基于AXIOS发送AJAX请求，返回的结果都是一个PROMISE实例
//  => ajax请求成功（网络层成功：状态码以2开头）
//  => PROMISE实例也是成功

axios({
  url: '/user/list',
  baseURL: 'http://123.0.0.1:8888',
  method: 'get',
  headers: {
    "Content-Type": "x-www-form-urlencoded"
  },
  params: {
    search: ''
  },
  data: {

  }
})
axios.interceptors.response.use(response => {
  // 从服务区取得了数据
  return response.data
}, response => {
  // 从服务器没有获取数据
  return Promise.reject(response)
})

axios.interceptors.request.use(config => {
  // 真实项目中，我们一般会在登录成功后，把从服务器获取的TOKEN信息存储到本地
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})