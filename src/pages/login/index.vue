<!-- 登录页 -->
<template>
  <div class="login-container">
    <div class="login-box">
      <div>
        <img
          class="user-icon"
          src="/static/images/user-icon.png"
        >
        <input
          v-model.lazy="loginForm.username"
          placeholder="请输入手机号"
          type="text"
        >
      </div>
      <div>
        <img
          class="psw-icon"
          src="/static/images/psw-icon.png"
        >
        <input
          v-model.lazy="loginForm.password"
          placeholder="请输入密码"
          type="password"
        >
      </div>
      <div
        class="login-btn"
        @click="login"
      >
        <span>登录</span>
      </div>
    </div>
  </div>
</template>

<script>
// import API from '@/api/user'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      loginForm: {
        username: '17783136819',
        password: '136819'
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  methods: {
    login() {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      this.$http.post({
        url: 'login',
        data: {
          ..._this.loginForm
        }
      }).then(res => {
        if (res) {
          wx.setStorageSync('token', res)
          console.log(wx.getStorageSync('token'))
          wx.switchTab({ url: '/pages/index/main' })
          wx.hideLoading()
          _this.$http.get({
            url: 'user/getLoginInfo'
          }).then(response => {
            _this.$store.commit('set_userInfo', response)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    width: 80%;
    & > div {
      width: 100%;
      position: relative;
      margin-bottom: 20rpx;
      input {
        height: 80rpx;
        border: 1px solid #eee;
        display: block;
        padding-left: 80rpx;
        border-radius: 10rpx;
        font-size: 10pt;
        &::placeholder {
          font-size: 8pt;
        }
      }
      img {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        top: 50%;
        left: 20rpx;
        transform: translateY(-50%);
      }
    }
    .login-btn {
      margin-bottom: 0;
      border-radius: 10rpx;
      height: 80rpx;
      width: 100%;
      line-height: 80rpx;
      text-align: center;
      background: #1296db;
      color: white;
    }
  }
}
</style>
