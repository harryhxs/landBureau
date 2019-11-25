// 定义请求地址
const host = 'http://47.108.20.116/land-bureau/'
const tokenKey = 'token'

const RETURN_CODE_HANDLER = {
  '401': function(response) {
    wx.redirectTo({
      url: '/pages/login/main'
    })
    wx.setStorageSync('token', '')
    return {}
  },
  '403': function(response) {

  },
  '404': function(response) {

  },
  '500': function(response) {

  }
}
// eslint-disable-next-line no-unused-vars
function CreateHeader(url, complete) {
  var header = {
    'content-type': 'application/json'
  }
  if (exceptionAddrArr.indexOf(url) == -1) { // 排除请求的地址不需要token的地址
    wx.getStorageSync({
      key: tokenKey,
      success: function(res) {
        header.authorization = res.data
      },
      fail: function(error) {
        console.log(error)
      },
      complete: function() {
        // eslint-disable-next-line valid-typeof
        complete && typeof complete === 'Function' ? complete(header) : null
      }
    })
  } else {
    // eslint-disable-next-line valid-typeof
    complete && typeof complete === 'Function' ? complete(header) : null
  }
}

function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token')
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json', // 默认转为json格式
        'authorization': token || ''
      },
      success: function(res) {
        console.log(res)
        if (res.statusCode === 200) {
          wx.hideLoading()
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
        wx.hideLoading()
        reject(error)
      },
      complete: function() {
        wx.hideLoading()
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
