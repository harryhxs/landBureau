<template>
  <div>
    <transition name="fade">
      <div
        v-if="errorshow"
        class="weui-toptips weui-toptips_warn"
      >{{ message }}</div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Errortip',
  data() {

  },
  computed: {
    ...mapState({
      errorshow: state => state.errormsg.error,
      message: state => state.errormsg.message
    })
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
