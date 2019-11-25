import Vue from 'vue'
import App from './App'
import fly from './utils/fly'
import MpvueRouterPatch from 'mpvue-router-patch'
Vue.prototype.$http = fly

import store from './store'

Vue.use(MpvueRouterPatch)
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
