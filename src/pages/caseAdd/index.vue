<!-- 添加case-->
<template>
  <div class="case-add-container">
    <div class="new-case">
      <van-cell-group>
        <van-field
          :value="landCase.caseName"
          title-width="100px"
          required
          label="案件名称"
          placeholder="请输入案件名称"
          @change="onChange($event, 'caseName')"
        />
        <van-field
          :value="discoveryTime"
          title-width="100px"
          required
          label="发现时间"
          disabled
          :placeholder="'请输入发现时间'"
          @click="openDatePicker('discoveryTime')"
        />
        <van-field
          :value="punishTime"
          title-width="100px"
          required
          label="处罚时间"
          disabled
          :placeholder="'请输入处罚时间'"
          @click="openDatePicker('punishTime')"
        />
        <van-field
          :value="transferTime"
          title-width="100px"
          required
          disabled
          label="移送时间"
          :placeholder="'请输入移送时间'"
          @click="openDatePicker('transferTime')"
        />
        <van-field
          :value="landCase.baseFarmlandArea"
          title-width="100px"
          required
          label="基本农田面积"
          placeholder="请输入农田面积"
          @change="onChange($event, 'baseFarmlandArea')"
        />
        <van-field
          :value="landCase.breachLaw"
          title-width="100px"
          required
          label="违反法律条款"
          placeholder="请输入违反法律条款"
          @change="onChange($event, 'breachLaw')"
        />
        <van-field
          :value="landCase.buildingArea"
          title-width="100px"
          required
          label="建设用地面积"
          placeholder="请输入建设用地面积"
          @change="onChange($event, 'buildingArea')"
        />
        <van-field
          :value="landCase.collectFine"
          title-width="100px"
          required
          label="收缴罚款"
          placeholder="请输入收缴罚款"
          @change="onChange($event, 'collectFine')"
        />
        <van-field
          v-model="landCase.croplandArea"
          title-width="100px"
          required
          label="耕地面积"
          placeholder="请输入耕地面积"
          @change="onChange($event, 'croplandArea')"
        />
        <van-field
          v-model="landCase.demolitionArea"
          title-width="100px"
          required
          label="拆除面积"
          placeholder="请输入拆除面积"
          @change="onChange($event, 'demolitionArea')"
        />
        <van-cell
          title="是否申请法院强制执行"
          title-width="350rpx;"
        >
          <van-radio-group
            style="display: flex;"
            :value="landCase.enableAppliedEnforce"
            @change="onChange($event,'enableAppliedEnforce')"
          >
            <van-radio
              name="1"
              icon-size="16px"
              style="margin-right: 30rpx;"
            >是</van-radio>
            <van-radio name="0">否</van-radio>
          </van-radio-group>
        </van-cell>
        <van-cell
          title="是否符合规划"
          title-width="350rpx;"
        >
          <van-radio-group
            style="display: flex;"
            :value="landCase.enablePlan"
            @change="onChange($event,'enablePlan')"
          >
            <van-radio
              name="1"
              icon-size="16px"
              style="margin-right: 30rpx;"
            >是</van-radio>
            <van-radio name="0">否</van-radio>
          </van-radio-group>
        </van-cell>
        <van-cell
          title="是否移送司法机关"
          title-width="350rpx;"
        >
          <van-radio-group
            style="display: flex;"
            :value="landCase.enableTransferOffice"
            @change="onChange($event,'enableTransferOffice')"
          >
            <van-radio
              name="1"
              icon-size="16px"
              style="margin-right: 30rpx;"
            >是</van-radio>
            <van-radio name="0">否</van-radio>
          </van-radio-group>
        </van-cell>
        <van-field
          v-model="landCase.farmlandArea"
          title-width="100px"
          required
          label="农用地面积"
          placeholder="请输入农用地面积"
          @change="onChange($event, 'farmlandArea')"
        />
        <van-field
          v-model="landCase.forfeitureArea"
          title-width="100px"
          required
          label="没收面积"
          placeholder="请输入没收面积"
          @change="onChange($event, 'forfeitureArea')"
        />
        <van-field
          v-model="landCase.gardenArea"
          title-width="100px"
          required
          label="园地面积"
          placeholder="请输入园地面积"
          @change="onChange($event, 'gardenArea')"
        />
        <van-field
          v-model="landCase.grasslandArea"
          title-width="100px"
          required
          label="草地面积"
          placeholder="请输入草地面积"
          @change="onChange($event, 'grasslandArea')"
        />
        <van-field
          v-model="landCase.issueFine"
          title-width="100px"
          required
          label="下达罚款"
          placeholder="请输入下达罚款"
          @change="onChange($event, 'issueFine')"
        />
        <van-field
          v-model="landCase.liableLevel"
          title-width="100px"
          required
          label="责任人级别"
          placeholder="请输入责任人级别"
          @change="onChange($event, 'liableLevel')"
        />
        <van-field
          v-model="landCase.occupyPosition"
          title-width="100px"
          required
          label="占地位置"
          placeholder="请输入占地位置"
          @change="onChange($event, 'occupyPosition')"
        />
        <van-field
          v-model="landCase.party"
          title-width="100px"
          required
          label="违法当事人"
          placeholder="请输入违法当事人"
          @change="onChange($event, 'party')"
        />
        <van-field
          v-model="landCase.personLiable"
          title-width="100px"
          required
          label="处分责任人"
          placeholder="请输入处分责任人"
          @change="onChange($event, 'personLiable')"
        />
        <van-field
          v-model="landCase.planningArea"
          title-width="100px"
          required
          label="符合规划面积"
          placeholder="请输入符合规划面积"
          @change="onChange($event, 'planningArea')"
        />
        <van-field
          v-model="landCase.remark"
          title-width="100px"
          required
          label="备注"
          type="textarea"
          autosize
          placeholder="请输入备注"
          @change="onChange($event, 'remark')"
        />
        <van-field
          v-model="landCase.unusedArea"
          title-width="100px"
          required
          label="未利用面积"
          placeholder="请输入未利用面积"
          @change="onChange($event, 'unusedArea')"
        />
        <van-field
          v-model="landCase.woodlandArea"
          title-width="100px"
          required
          label="林地面积"
          placeholder="请输入林地面积"
          @change="onChange($event, 'woodlandArea')"
        />
      </van-cell-group>
    </div>
    <div
      class="submit-btn"
      @click="submitData"
    >
      <van-button
        :type="id? 'danger' : 'primary'"
        size="large"
      >{{ id? '修改' : '提交' }}</van-button>
    </div>
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
import utils from '@/utils/index'
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      dateFormat: utils.formatDate,
      landCase: {
        baseFarmlandArea: 0, // 基本农田面积
        breachLaw: '', // 违反法律条款
        buildingArea: 0, // 建设用地面积
        caseName: '', // 案件名称
        collectFine: 0, // 收缴罚款
        croplandArea: 0, // 耕地面积
        demolitionArea: 0, // 拆除面积
        discoveryTime: '', // 发现时间
        enableAppliedEnforce: '0', // 是否申请法院强制执行
        enablePlan: '0', // 是否符合规划
        enableTransferOffice: '0', // 是否移送司法机关
        farmlandArea: 0, // 农用地面积
        forfeitureArea: 0, // 没收面积
        gardenArea: 0, // 园地面积
        grasslandArea: 0, // 草地面积
        issueFine: 0, // 下达罚款
        liableLevel: 0, // 责任人级别
        occupyPosition: '', // 占地位置
        occupyTotalArea: 0, // 占地总面积
        party: '', // 违法当事人
        personLiable: '', // 处分责任人
        planningArea: 0, // 符合规划面积
        punishTime: '', // 处罚时间
        remark: '', // 备注
        transferTime: '', // 移送时间
        unusedArea: 0, // 未利用面积
        woodlandArea: 0 // 林地面积
      },
      landCaseAttachList: [
        {
          'caseId': 'string',
          'createTime': '2019-12-07T05:16:12.767Z',
          'fileUrl': 'string',
          'id': 'string',
          'updateTime': '2019-12-07T05:16:12.767Z'
        }
      ],
      formList: [],
      showPicker: false,
      currentDate: new Date().getTime(),
      currentType: '',
      discoveryTime: '',
      punishTime: '',
      transferTime: '',
      formatter: (type, value) => {
        if (type === 'year') {
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        }
        return value
      },
      id: ''
    }
  },
  computed: {

  },
  watch: {

  },
  onLoad() {
    let title = '添加案件'
    this.formList = Object.keys(this.landCase)
    this.id = this.$route.query.id
    if (this.id) {
      title = '修改案件'
      this.getCaseData()
    }
    wx.setNavigationBarTitle({ title: title })
  },
  methods: {
    getCaseData() {
      this.$http.post({
        url: 'landCase/getLandCaseDetailByLandCaseId?landCaseId=' + this.id
      }).then(res => {
        if (res && res.data) {
          Object.keys(this.landCase).forEach(item => {
            if (item == 'discoveryTime') {
              this.discoveryTime = utils.formatDate(res.data.landCase[item])
            } else if (item == 'punishTime') {
              this.punishTime = utils.formatDate(res.data.landCase[item])
            } else if (item == 'transferTime') {
              this.transferTime = utils.formatDate(res.data.landCase[item])
            } else {
              this.landCase[item] = res.data.landCase[item] + ''
            }
          })
        }
      })
    },
    openDatePicker(type) {
      this.showPicker = true
      this.currentType = type
    },
    changeDate(event) {
      this.landCase[this.currentType] = event.mp.detail
      this.currentDate = event.mp.detail
      if (this.currentType == 'discoveryTime') {
        this.discoveryTime = utils.formatDate(event.mp.detail)
      } else if (this.currentType == 'punishTime') {
        this.punishTime = utils.formatDate(event.mp.detail)
      } else {
        this.transferTime = utils.formatDate(event.mp.detail)
      }
      this.showPicker = false
    },
    onChange(event, type) {
      this.landCase[type] = event.mp.detail
    },
    getDateTime(time) {
      return new Date(time).toLocaleDateString()
    },
    submitData() {
      let params = {
        landCase: this.landCase,
        landCaseAttachList: this.landCaseAttachList
      }
      let url = 'landCase/createLandCase'
      if (this.id) {
        url = 'landCase/updateLandCase'
        params.landCase.id = this.id
      }
      this.$http.post({
        url: url,
        data: params
      }).then(res => {
        if (res && res.data) {
          wx.showToast({
            title: '创建成功'
          })
          wx.navigateBack()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.case-add-container {
}
</style>
