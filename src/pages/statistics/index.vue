<!-- 统计信息 -->
<template>
  <div class="statistic-container">
    <van-cell-group>
      <van-field
        :value="startTime"
        title-width="100px"
        required
        label="开始时间"
        placeholder="请选择开始时间"
        @change="onChange($event, 'start')"
      />
      <van-field
        :value="endTime"
        title-width="100px"
        required
        label="结束时间"
        disabled
        :placeholder="'请选择结束使劲'"
        @click="openDatePicker('end')"
      />
    </van-cell-group>
    <div class="title">{{ userName }}的巡查统计情况</div>
    <scroll-view
      class="index-page-scroll-view"
      :scroll-y="true"
      @scrolltolower="reachBottom"
      @scroll="scrollContainerFn"
    >
      <template v-for="(item, index) in listData">
        <task-item
          :key="index"
          :item="item"
        />
      </template>
    </scroll-view>
    <!-- 时间插件 -->
    <van-action-sheet
      :show="showPicker"
      title="选择日期"
      @close="showPicker = false"
    >
      <van-datetime-picker
        type="date"
        :value="currentDate"
        @confirm="changeDate"
        @cancel="showPicker = false"
      />
    </van-action-sheet>
  </div>
</template>

<script>
import TaskItem from './components/taskItem'
export default {
  components: {
    TaskItem
  },
  props: {

  },
  data() {
    return {
      userName: '张大大',
      listData: [{}, {}],
      showPicker: false,
      currentType: '',
      currentDate: new Date().getTime(),
      startTime: '',
      endTime: ''
    }
  },
  computed: {

  },
  watch: {

  },
  onShow() {

  },
  methods: {
    reachBottom() {

    },
    scrollContainerFn() {

    },
    openDatePicker(type) {
      this.showPicker = true
      this.currentType = type
    },
    changeDate(event) {
      this.currentDate = event.mp.detail
      if (this.currentType == 'start') {
        this.startTime = event.mp.detail
      } else {
        this.endTime = event.mp.detail
      }
      this.getData()
    },
    getData() {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.$http.post({
        url: '/statistics/user',
        data: {
          startTime: this.startTime,
          endTime: this.endTime
        }
      }).then(res => {
        if (res && res.data) {
          this.listData = res.data || []
        }
        wx.hideLoading()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.statistic-container {
  padding: 20rpx;
  .title {
    height: 30rpx;
    line-height: 30rpx;
    text-align: center;
  }
  .index-page-scroll-view {
    height: calc(100vh - 40rpx);
    padding-top: 20rpx;
  }
}
</style>
