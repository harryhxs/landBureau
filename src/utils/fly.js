// 定义请求地址
const host = 'http://47.108.20.116/land-bureau/'
const exceptionAddrArr = ['login']
const RETURN_CODE_HANDLER = {
  '401': function(response) {
    wx.redirectTo({
      url: '/pages/login/main'
    })
    wx.setStorageSync('token', '')
    return {}
  },
  '403': function(response) {
    wx.redirectTo({
      url: '/pages/login/main'
    })
    wx.setStorageSync('token', '')
    return {}
  },
  '404': function(response) {

  },
  '500': function(response) {

  }
}

function request(url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token')
    let header = { 'content-type': 'application/json' }
    if (exceptionAddrArr.indexOf(url) == -1) {
      header.authorization = token || ''
    }
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: header,
      success: function(res) {
        console.log(res)
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          const handler = RETURN_CODE_HANDLER[res.statusCode]
          if (handler) {
            handler(res.data)
          }
          reject(res)
        }
      },
      fail: function(error) {
        reject(error)
      },
      complete: function() {
      }
    })
  })
}

function get(obj) {
  return request(obj.url, 'get', obj.data)
}

function post(obj) {
  return request(obj.url, 'post', obj.data)
}

export default {
  request,
  get,
  post
}
