<!-- 设置用户授权 -->
<template>
  <div class="set-user-authorization">
    <div class="author-btn">
      <button
        open-type="getUserInfo"
        lang="zh_CN"
        @getuserinfo="onGotUserInfo"
      >获取用户信息</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  methods: {
    onGotUserInfo(res) {
      wx.showLoading()
      if (res.mp.detail.userInfo) {
        wx.setStorage({
          key: 'user_chart',
          data: res.mp.detail.userInfo
        })
        wx.switchTab({
          url: '/pages/mine/main'
        })
      } else {
        wx.hideLoading()
        wx.showModal({
          title: '抱歉',
          content: '拒绝授权登录将会导致您无法使用小程序，请重新授权',
          showCancel: false
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.set-user-authorization {
  height: 100vh;
  position: relative;
  background: #eee;
  .author-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    button {
      background: red;
      color: white;
    }
  }
}
</style>
