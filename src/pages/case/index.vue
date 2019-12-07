<!-- 案件列表 -->
<template>
  <div class="case-list-container">
    <scroll-view
      class="index-page-scroll-view"
      :style="{height: '100vh'}"
      :scroll-y="true"
      @scrolltolower="reachBottom"
      @scroll="scrollContainerFn"
    >
      <div
        v-for="(item, index) in listData"
        :key="index"
        class="case-item"
      >
        <div class="case-name">{{ item.caseName }}</div>
        <div
          class="btn"
          @click="viewDetail(item.id)"
        >查看</div>
      </div>
    </scroll-view>
    <div class="extra-btns">
      <div
        class="btn"
        @click="addRecords"
      >
        <van-icon
          name="plus"
          size="60rpx"
          color="#707070"
        />
      </div>
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
      listData: [],
      loading: false,
      pageNum: 1,
      pageSize: 10,
      isBtm: false
    }
  },
  computed: {

  },
  watch: {
    scrollBottom(curVal, oldVal) {
      if (this.scrollBottom < 100) {
        this.getData()
        this.loading = true
      }
    }
  },
  onShow() {
    this.getData(true)
  },
  onLoad() {
    wx.setNavigationBarTitle({ title: '案件列表' })
    this.getData(true)
  },
  methods: {
    // 请求数据
    getData(init) {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      wx.showLoading({
        title: '加载中...'
      })
      this.$http.post({
        url: 'landCase/listLandCase',
        data: params
      }).then(res => {
        if (res && res.data && res.data.list && res.data.list.length > 0) {
          if (init) {
            this.listData = res.data.list
          } else {
            this.listData = [...this.listData, ...res.data.list]
          }
          this.isBtm = this.listData.length >= res.data.total
        } else {
          this.listData = []
        }
        wx.hideLoading()
      })
    },
    reachBottom() {
      if (this.isBtm) {
        return
      }
      this.pageNum++
      this.getData()
    },
    scrollContainerFn(e) {

    },
    viewDetail(id) {
      this.$router.push({
        path: '/pages/caseAdd/main', query: {
          id: id
        }
      })
    },
    addRecords() {
      wx.navigateTo({
        url: '/pages/caseAdd/main'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.case-list-container {
  margin: 20rpx;
  position: relative;
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
  .index-page-scroll-view {
    .case-item {
      font-size: 10pt;
      padding: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2rpx solid #eee;
      .case-name {
        width: calc(100% - 100rpx);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 10pt;
      }
      .btn {
        background: red;
        color: #fff;
        height: 50rpx;
        width: 80rpx;
        line-height: 50rpx;
        border-radius: 10rpx;
        text-align: center;
        font-size: 8pt;
      }
    }
  }
}
</style>
