export default {
  namespaced: true,
  state: {
    error: false,
    errorMsg: ''
  },
  mutations: {
    setError (state, { hasError, errorMsg }) {
      state.error = hasError
      state.errorMsg = errorMsg
    }
  },
  actions: {
    setError ({ commit }, payload) {
      commit('setError', payload)
    }
  },
  getters: {
    hasError (state) {
      return state.error
    },
    getErrorMsg (state) {
      return state.errorMsg
    }
  }
}
