const state = {
  error: false,
  message: '',
  usserInfo: ''
}

const getters = {}

const actions = {
  errorshow({ commit }, data) {
    commit('errorshow', data)
    setTimeout(() => {
      commit('errorhide')
    }, 3000)
  }
}

const mutations = {
  errorshow(state, data) {
    state.error = true
    state.message = data
  },
  errorhide(state, data) {
    state.error = false
    state.message = ''
  },
  set_userInfo(state, data) {
    state.usserInfo = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
