<!-- vue 模板 -->
<template>
  <div class="inspect-container">
    <map
      class="inspect-map"
      :latitude="currPosition.latitude"
      :longitude="currPosition.longitude"
      show-location="false"
      :polyline="polyLine"
      :markers="markers"
      @markertap="makertap"
    />
    <div class="extra-btns">
      <div
        class="btn"
        @click="showlayer"
      >
        <van-icon
          name="ellipsis"
          size="60rpx"
          color="#707070"
        />
      </div>
      <div
        class="btn"
        @click="show1 = true"
      >
        <van-icon
          name="plus"
          size="60rpx"
          color="#707070"
        />
      </div>
    </div>
    <van-action-sheet
      :show="show"
      title="任务列表"
      @close="show = false"
    >
      <view>内容</view>
    </van-action-sheet>
    <van-action-sheet
      :show="show1"
      title="添加记录"
      @close="show1 = false"
    >
      <view>内容1</view>
    </van-action-sheet>
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
      currPosition: {
        longitude: 0,
        latitude: 0
      },
      polyLine: [],
      markers: [],
      show: false,
      show1: false
    }
  },
  computed: {

  },
  watch: {

  },
  onLoad() {
    const _this = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        _this.currPosition.latitude = res.latitude
        _this.currPosition.longitude = res.longitude
      }
    })
  },
  methods: {
    makertap() {

    },
    onClickHide() {
      this.show = false
    },
    showlayer() {
      this.show = true
    }
  }
}
</script>

<style scoped lang="scss">
.inspect-container {
  height: 100vh;
  position: relative;
  .inspect-map {
    width: 100%;
    height: 100%;
  }
  .extra-btns {
    position: absolute;
    bottom: 20rpx;
    right: 20rpx;
    .btn {
      width: 80rpx;
      height: 80rpx;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20rpx;
      /deep/.van-icon {
        display: flex;
      }
    }
  }
}
</style>
