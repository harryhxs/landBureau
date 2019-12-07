<!-- 我的页面 -->
<template>
  <div class="mine-container" />
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      nickName: '',
      avatar: ''
    }
  },
  computed: {

  },
  watch: {

  },
  onLoad() {
    this.loginfo()
  },
  methods: {
    loginfo() {
      let _this = this
      wx.getSetting({
        success(res) {
          console.log('res', res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                this.nickName = res.userInfo.nickName
              },
              fail(res) {
                console.log('获取用户信息失败', res)
              }
            })
          } else {
            _this.showSettingToast('请授权')
          }
        }
      })
    },
    showSettingToast: function(e) {
      wx.showModal({
        title: '提示！',
        confirmText: '去设置',
        showCancel: false,
        content: e,
        success: function(res) {
          if (res.confirm) {
            wx.openSetting({
              success: (res) => {
                console.log(res)
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
