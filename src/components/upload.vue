<template>
  <div class="j-pic-upload">
    <div
      class="j-upload-btn"
      :style="{'width':width || '120rpx','height':height || '120rpx'}"
      @click="uploadImg()"
    >
      <span class="j-upload-add">+</span>
    </div>
    <img
      v-for="(src,index) in urls"
      :key="index"
      :src="src.fileUrl"
      :style="{'width':width || '120rpx','height':height || '120rpx'}"
      class="img"
      @click="previewImg(index)"
    >
  </div>
</template>
<script>
import uploadFile from '../utils/uploadFile'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['width', 'height', 'max', 'srcs'],
  data() {
    return {
      urls: []
    }
  },
  mounted() {
    this.urls = this.srcs || []
  },
  methods: {
    // 获取签名
    getCaseUrl(filePath) {
      const aliyunFileKey = 'test.png'
      const _this = this
      this.$http.post({
        url: 'oss/getInspectUploadPostPolicy?fileName=' + aliyunFileKey
      }).then(res => {
        if (res && res.data) {
          uploadFile(filePath, '/inspect', res.data, function(result) {
            _this.urls.push({ fileUrl: result })
            _this.$emit('change', _this.urls)
          }, function(result) { })
        }
      })
    },
    uploadImg() {
      let that = this
      wx.chooseImage({
        count: that.max || 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          if (res.tempFilePaths.length + that.urls.length > 5) {
            wx.showModal({
              title: '提示',
              content: '最多只能上传5张图片'
            })
            return
          }
          res.tempFilePaths.forEach((v, i) => {
            wx.showLoading({
              title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
              mask: true
            })
            that.getCaseUrl(v)
          })
          that.$emit('choosed', { all: that.urls, currentUpload: res.tempFilePaths })
        }
      })
    },
    previewImg(index) {
      let that = this
      wx.showActionSheet({
        itemList: ['预览', '删除'],
        success: function(res) {
          if (res.tapIndex === 0) {
            wx.previewImage({
              current: that.urls[index],
              urls: that.urls
            })
          } else {
            that.urls.splice(index, 1)
            that.$emit('delete', that.urls)
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.j-pic-upload {
  padding: 10rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.j-upload-btn {
  border: 1px dashed #ddd;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}
.j-upload-add {
  font-size: 80rpx;
  font-weight: 500;
  color: #c9c9c9;
}
.img {
  margin: 10rpx 20rpx 10rpx 0;
}
</style>
