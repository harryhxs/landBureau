<!-- 统计信息 -->
<template>
  <div class="statistic-container">
    <div class="title">全部巡查统计情况</div>
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
      listData: [{}, {}]
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  methods: {
    reachBottom() {

    },
    scrollContainerFn() {

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
