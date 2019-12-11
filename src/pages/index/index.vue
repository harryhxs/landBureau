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
      @callouttap="callouttap"
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
        @click="addRecords"
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
      <div class="task-box">
        <template v-for="item in taskList">
          <div
            :key="item.id"
            class="task-box-item"
          >
            <span class="name">{{ item.title }}</span>
            <span
              class="btn"
              @click="startTask(item)"
            >开始</span>
          </div>
        </template>
      </div>
    </van-action-sheet>
    <van-action-sheet
      :show="show1"
      title="添加记录"
      @close="show1 = false"
    >
      <div class="new-task-form">
        <van-cell-group>
          <van-field
            :value="form.title"
            title-width="50px"
            required
            label="名称"
            placeholder="请输入记录名称"
            @change="onChange($event, 'title')"
          />
          <van-field
            :value="form.address"
            title-width="50px"
            required
            label="地址"
            placeholder="请输入地址"
            @change="onChange($event, 'address')"
          />
          <van-field
            v-model="form.memo"
            title-width="50px"
            required
            label="描述"
            placeholder="请输入描述"
            type="textarea"
            autosize
            @change="onChange($event, 'memo')"
          />
          <div class="uplad-container">
            <upload
              width="120rpx"
              height="120rpx"
              max="5"
              :srcs="[]"
              @choosed="choosed"
              @delete="onDelete"
            />
          </div>
        </van-cell-group>
        <div
          class="btn-box"
          @click="submitData"
        >
          <van-button
            type="primary"
            size="large"
          >提交</van-button>
        </div>
      </div>
    </van-action-sheet>
    <!-- 巡查点详情 -->
    <van-dialog
      use-slot
      async-close
      :show="showPoint"
      show-cancel-button
      confirm-button-open-type="confirm"
      @close="showPoint = false"
      @confirm="showPoint = false"
    >
      <van-cell-group>
        <van-field
          :value="form.title"
          title-width="50px"
          required
          label="名称"
          placeholder="请输入记录名称"
          @change="onChange($event, 'title')"
        />
        <van-field
          :value="form.address"
          title-width="50px"
          required
          label="地址"
          placeholder="请输入地址"
          @change="onChange($event, 'address')"
        />
        <van-field
          v-model="form.memo"
          title-width="50px"
          required
          label="描述"
          placeholder="请输入描述"
          type="textarea"
          autosize
          @change="onChange($event, 'memo')"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import Upload from '@/components/upload'
import QQMapWX from '../../utils/qqmap-wx-jssdk.js'
var qqmapsdk = new QQMapWX({
  key: 'VZZBZ-PBJWW-SJSRV-RGWPM-UW6RO-IPBEY'
})
export default {
  components: {
    Upload
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
      taskList: [],
      show: false,
      show1: false,
      currentTask: {},
      form: {
        id: '',
        title: '',
        memo: '',
        address: '',
        longitude: '',
        latitude: '',
        fileList: []
      },
      title: '',
      showPoint: false
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
    let params = {
      pageSize: 10,
      pageNum: 1
    }
    this.$http.post({
      url: 'landInspect/fuzzyQueryLandInspectList',
      data: {
        ...params
      }
    }).then(res => {
      if (res) {
        this.taskList = res.data.list || []
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
    },
    onChange(event, type) {
      this.form[type] = event.mp.detail
    },
    // 开始任务
    startTask(item) {
      this.currentTask = item
      this.getMarkers()
      let startPoint = item.startPoint ? item.startPoint.split(',') : []
      let endPoint = item.endPoint ? item.endPoint.split(',') : []
      let startMarker = {
        id: startPoint[0] + startPoint[1],
        latitude: Number(startPoint[1] || 0),
        longitude: Number(startPoint[0] || 0),
        label: {
          content: '起点',
          bgColor: '#fff',
          padding: 5
        },
        zIndex: -1
      }
      let endMarker = {
        id: endPoint[0] + endPoint[1],
        latitude: Number(endPoint[1]),
        longitude: Number(endPoint[0]),
        label: {
          content: '终点',
          bgColor: '#fff',
          padding: 5
        },
        zIndex: -1
      }
      this.markers.push(startMarker)
      this.markers.push(endMarker)
      let start = {
        latitude: Number(startPoint[1] || 0),
        longitude: Number(startPoint[0] || 0)
      }
      let end = {
        latitude: Number(endPoint[1] || 0),
        longitude: Number(endPoint[0] || 0)
      }
      this.planRoute(start, end)
      this.currPosition.latitude = Number(startPoint[1] || 0)
      this.currPosition.longitude = Number(startPoint[0] || 0)
      this.show = false
    },
    // 规划路线
    planRoute(start, end) {
      let _this = this
      qqmapsdk.direction({
        mode: 'driving',
        from: start,
        to: end,
        success(res) {
          var coors = res.result.routes[0].polyline
          var pl = []
          var kr = 1000000
          // 坐标解压（返回的点串坐标，通过前向差分进行压缩）
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr
          }
          // 将解压后的坐标放入点串数组pl中
          for (var j = 0; j < coors.length; j += 2) {
            pl.push({ latitude: coors[j], longitude: coors[j + 1] })
          }
          console.log(pl)
          // 设置polyline
          _this.polyLine = [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }
          ]
        },
        fail(error) {
          console.log(error)
        }
      })
    },
    // 上传图片
    afterRead(event) {
      const { file } = event.mp.detail
      console.log('111111')
      console.log(file)
      // this.$http.post({
      //   url: 'oss/getCaseSignUrl'
      // })
      wx.uploadFile({
        url: '',
        filePath: file.path,
        name: file.name,
        success(res) {

        }
      })
    },
    // 添加巡查记录
    addRecords() {
      if (!this.currentTask.id) {
        wx.showModal({
          title: '提示',
          content: '请先开始任务'
        })
        return
      }
      this.show1 = true
    },
    callouttap(e) {
      console.log(e.mp.markerId)
      let marker = this.markers.find(val => val.id == e.mp.markerId)
      let pointId = marker.id
      this.getMarkerDetail(pointId)
      this.showPoint = true
    },
    getMarkerDetail(pointId) {
      this.$http.post({
        url: 'landInspect/getPointDomainObjectDetailByPointId?pointId=' + pointId
      }).then(res => {
        if (res && res.data) {
          this.form.title = res.data.landInspectPoint.title
          this.form.address = res.data.landInspectPoint.address
          this.form.memo = res.data.landInspectPoint.memo
          this.form.fileList = res.data.attachList
        }
      })
    },
    getMarkers() {
      this.$http.post({
        url: 'landInspect/listLandInspectPointByInspectId',
        data: {
          'inspectId': this.currentTask.id,
          'pageNum': 1,
          'pageSize': 999
        }
      }).then(res => {
        if (res && res.data) {
          let inspectList = res.data.list || []
          inspectList.forEach(element => {
            let marker = {
              id: element.id,
              latitude: element.latitude,
              longitude: element.longitude,
              callout: {
                content: element.title,
                display: 'ALWAYS',
                padding: 5
              },
              zIndex: -1
            }
            this.markers.push(marker)
          })
          console.log(this.polyLine)
        }
      })
    },
    submitData() {
      console.log(this.form)
      let _this = this
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          let params = {
            landInspectPoint: {
              inspectId: _this.currentTask.id,
              title: _this.form.title,
              address: _this.form.address,
              memo: _this.form.memo,
              longitude: res.longitude + '',
              latitude: res.latitude + ''
            },
            attachList: [{ fileUrl: 'www.baidu.com' }]
          }
          _this.$http.post({
            url: 'landInspect/createLandInspectPoint',
            data: params
          }).then(res => {
            if (res) {
              _this.show1 = false
            }
          })
        }
      })
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
  .task-box {
    font-size: 10pt;
    height: 50vh;
    padding: 20rpx;
    .task-box-item {
      font-size: 10pt;
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      border-bottom: 2rpx solid #eee;
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
      .name {
        width: calc(100% - 100rpx);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 10pt;
      }
    }
  }
  .new-task-form {
    height: 80vh;
    overflow-y: scroll;
    position: relative;
    .btn-box {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
.uplad-container {
  margin-top: 20rpx;
  padding-left: 20rpx;
}
</style>
