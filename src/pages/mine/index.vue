<!-- 我的页面 -->
<template>
  <div class="user-info-center-container">
    <div class="user-detail">
      <div class="avatar">
        <img :src="avatar">
      </div>
      <div>
        <div>{{ nickName }}</div>
        <div class="nick-name">用户名：realName</div>
      </div>
    </div>
    <div class="setting">
      <van-cell-group>
        <van-cell
          is-link
          title="修改密码"
          link-type="navigateTo"
          url="/pages/changePs/main"
        />
        <van-cell
          is-link
          title="设置"
          clickable
          @click="openSetting"
        />
        <van-cell
          is-link
          title="我的统计"
          link-type="navigateTo"
          url="/pages/statistics/main"
        />
        <van-cell
          is-link
          title="全部统计"
          link-type="navigateTo"
          url="/pages/statisticAll/main"
        />
        <van-cell
          title="退出登录"
          clickable
          @click="logout"
        />
      </van-cell-group>
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
    wx.getUserInfo({
      success(res) {

      }
    })
  },
  methods: {
    loginfo() {
      let _this = this
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                _this.nickName = res.userInfo.nickName
                _this.avatar = res.userInfo.avatarUrl
              },
              fail(res) {
                // console.log('获取用户信息失败', res)
              }
            })
          } else {
            _this.showSettingToast('您还没有用户授权，点设置去授权')
          }
        }
      })
    },
    showSettingToast: function(e) {
      let _this = this
      wx.showModal({
        title: '温馨提示',
        confirmText: '去设置',
        showCancel: false,
        content: e,
        success: function(res) {
          if (res.confirm) {
            _this.$router.push('/pages/setting/main')
          }
        }
      })
    },
    openSetting() {
      wx.openSetting({
        success: function(res) {
        }
      })
    },
    logout() {
      this.$http.post({
        url: 'logout'
      }).then(res => {
        wx.setStorageSync('token', '')
        wx.redirectTo({
          url: '/pages/login/main'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.user-info-center-container {
  height: 100vh;
  background: #eee;
  .user-detail {
    background: white;
    padding: 100rpx 20rpx 40rpx 40rpx;
    display: flex;
    align-items: center;
    .avatar {
      width: 128rpx;
      height: 128rpx;
      border-radius: 50%;
      overflow: hidden;
      border: 8rpx solid #fff;
      margin-right: 40rpx;
    }
    .nick-name {
      font-size: 10pt;
      margin-top: 20rpx;
    }
  }
  .setting {
    background: white;
    margin-top: 50rpx;
  }
}
</style>
