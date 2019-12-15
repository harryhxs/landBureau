<!-- 任务卡片 -->
<template>
  <div class="task-card-container">
    <div class="task-title">
      <span>{{ taskInfo.userName }}</span>
    </div>
    <div class="task-content">
      <div>
        <span class="title">巡查任务数量：</span>
        <span class="content">{{ taskInfo.inspectNum }}</span>
      </div>
      <div>
        <span class="title">行驶里程：</span>
        <span class="content">{{ taskInfo.mileage }}</span>
      </div>
      <div>
        <span class="title">上传图片数量：</span>
        <span class="content">{{ taskInfo.picSize }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      taskInfo: {
        userName: '张大大',
        mileage: 1000,
        picSize: 20,
        inspectNum: 10
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

  }
}
</script>

<style scoped lang="scss">
.task-card-container {
  font-size: 9pt;
  padding: 10rpx 20rpx;
  border: 1px solid #e6e6e6;
  border-radius: 8rpx;
  margin-top: 20rpx;
  .task-title {
    font-weight: bold;
    text-align: center;
  }
  .task-content {
    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 40rpx;
      .title {
        flex: 2;
      }
      .content {
        margin-left: 5rpx;
        text-align: left;
        color: #aaa;
      }
    }
  }
}
</style>
