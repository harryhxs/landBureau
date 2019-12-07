<!-- 注册页 -->
<template>
  <div class="login-container">
    <div class="login-box">
      <div>
        <img
          class="mobile-icon"
          src="/static/images/mobile.png"
        >
        <input
          v-model.lazy="loginForm.adminMobile"
          placeholder="请输入管理员手机号"
          type="text"
        >
      </div>
      <div>
        <img
          class="user-icon"
          src="/static/images/user-icon.png"
        >
        <input
          v-model.lazy="loginForm.realName"
          placeholder="请输入真实姓名"
          type="text"
        >
      </div>
      <div>
        <img
          class="mobile-icon"
          src="/static/images/mobile.png"
        >
        <input
          v-model.lazy="loginForm.moblie"
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
        @click="register"
      >
        <span>注册</span>
      </div>
      <div
        class="login-btn back"
        @click="goBack"
      >
        <span>返回</span>
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
        adminMobile: '',
        realName: '',
        moblie: '',
        password: ''
      }
    }
  },
  computed: {

  },
  watch: {

  },
  onLoad() {
    this.loginForm.adminMobile = ''
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    register() {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      this.$http.post({
        url: 'user/register',
        data: {
          ..._this.loginForm
        }
      }).then(res => {
        if (res && res.data) {
          wx.hideLoading()
          wx.showModal({
            title: '注册成功提示',
            content: '您已注册成功，待管理员审核通过',
            success(res) {
              if (res.confirm) {
                _this.goBack()
              }
            }
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
      &.back {
        margin-top: 30rpx;
        background: #07c160;
      }
    }
    .register-tips {
      margin-top: 20rpx;
      font-size: 8pt;
      color: #d81e06;
    }
  }
  .moblie-icon {
    width: 30rpx;
  }
}
</style>
