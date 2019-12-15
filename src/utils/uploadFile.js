const uploadFile = function(filePath, dir, urlMap, successc, failc) {
  const aliyunFileKey = urlMap.key
  const aliyunServerURL = 'http://pdocs.' + urlMap.host
  const policyBase64 = urlMap.policy
  const accessid = urlMap.OSSAccessKeyId
  const signature = urlMap.signature
  const returnUrl = urlMap.url
  const formData = {
    key: aliyunFileKey,
    policy: policyBase64,
    OSSAccessKeyId: accessid,
    signature: signature,
    success_action_status: '200'
  }
  console.log('fromData', formData)
  console.log('aliyunServerURL', aliyunServerURL)
  wx.uploadFile({
    url: aliyunServerURL,
    filePath: filePath,
    name: 'file',
    formData: formData,
    success: function(res) {
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return
      }
      successc(returnUrl)
      wx.hideLoading()
    },
    fail: function(err) {
      failc(err)
      wx.hideLoading()
    }
  })
  // wx.hideLoading()
}

export default uploadFile
