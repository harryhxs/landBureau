<template>
  <div class="static-div row-center">
    <img
      class="lordingImg"
      src="../../static/images/refresh.png"
    >
  </div>
</template>

<script>
export default {
  name: 'RefreshLoading',
  data() {
    return {
    }
  },
  method: {
  }
}
</script>

<style scoped>
.static-div {
  height: 200rpx;
  width: 100%;
  top: 0;
  background: rgba(247, 247, 247, 1);
}
.lordingImg {
  height: 100rpx;
  width: 100rpx;
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>

