import Flyio from 'flyio'
const request = new Flyio()

request.config.timeout = 30 * 1000

const RETURN_CODE_HANDLER = {
  '401': function(response) {
    wx.redirectTo({
      url: '/pages/login/main'
    })
    wx.setStorageSync('userInfo', '')
    return {}
  },
  '403': function(response) {

  },
  '404': function(response) {

  },
  '500': function(response) {

  }
}

const errorHandler = function(err) {
  console.error(err)
  return err
}

request.interceptors.request.use((request) => {
  request.headers['Content-Type'] = 'application/json'
  request.headers['Accept'] = '*/*'
  // 这里必须判断userinfo是否为空，不然不存在直接取sessionId会报错
  if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo').sessionId) {
    request.headers['x-auth-token'] = wx.getStorageSync('userInfo').sessionId
  }
  wx.showLoading({
    title: '加载中...'
  })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    const handler = RETURN_CODE_HANDLER[response.data.code]
    if (handler) {
      return promise.resolve(handler(response))
    }
    return response.data.success ? promise.resolve(response.data) : promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    return promise.reject(errorHandler(err))
  }
)

export default request
