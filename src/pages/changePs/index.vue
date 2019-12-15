<!-- 登录页 -->
<template>
  <div>
    <van-notify id="van-notify" />
    <div class="login-container">
      <div class="login-box">
        <div>
          <img
            class="user-icon"
            src="/static/images/user-icon.png"
          >
          <input
            v-model.lazy="userForm.username"
            disabled
            placeholder="请输入手机号"
            type="text"
          >
        </div>
        <div v-if="!canNext">
          <img
            class="psw-icon"
            src="/static/images/psw-icon.png"
          >
          <input
            v-model.lazy="userForm.oldPassword"
            placeholder="请输入旧密码"
            type="password"
          >
        </div>
        <template v-else>
          <div>
            <img
              class="psw-icon"
              src="/static/images/psw-icon.png"
            >
            <input
              v-model.lazy="userForm.password"
              placeholder="请输入密码"
              type="password"
            >
          </div>
          <div>
            <img
              class="psw-icon"
              src="/static/images/psw-icon.png"
            >
            <input
              v-model.lazy="userForm.checkPassword"
              placeholder="请再次输入密码"
              type="password"
            >
          </div>
        </template>
        <div
          v-if="!canNext"
          class="login-btn"
          @click="nextFunc"
        >
          <span>下一步</span>
        </div>
        <div
          v-else
          class="login-btn"
          @click="changePs"
        >
          <span>修改密码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notify from '../../../static/vant-weapp/dist/notify/notify'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      userForm: {
        username: '',
        password: '',
        checkPassword: '',
        oldPassword: ''
      },
      canNext: false
    }
  },
  computed: {

  },
  watch: {

  },
  onShow() {
    let _this = this
    this.userForm = {
      username: '',
      password: '',
      checkPassword: '',
      oldPassword: ''
    }
    wx.getStorage({
      key: 'userInfo', success: function(res) {
        _this.userForm.username = res.data.data.mobile
      }
    })
  },
  methods: {
    nextFunc() {
      if (!this.userForm.oldPassword) {
        Notify({ message: '请输入旧密码', type: 'warning' })
        return
      }
      this.canNext = true
    },
    changePs() {
      if (this.userForm.password != this.userForm.checkPassword) {
        Notify({ message: '输入密码不一致', type: 'warning' })
        return
      }
      if (!this.userForm.password) {
        Notify({ message: '请输入密码', type: 'warning' })
        return
      }
      if (!this.userForm.checkPassword) {
        Notify({ message: '请再次输入密码', type: 'warning' })
        return
      }
      this.$http.post({
        url: '/user/updatePassword',
        data: {
          newPassword: this.userForm.password,
          oldPassword: this.userForm.oldPassword
        }
      }).then(res => {
        if (res) {
          wx.showToast({
            title: '修改密码成功'
          })
          this.$router.push('/pages/login/main')
        } else {
          wx.showToast({
            title: '修改密码失败'
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
      background: #d81e06;
      color: white;
      &.register {
        background: #1296db;
        margin-top: 30rpx;
      }
    }
  }
}
</style>
