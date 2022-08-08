export default {
  state: {
    error: false,
    errorMsg: '',
    loading: false
  },
  mutations: {
    setError (state, { hasError, errorMsg }) {
      state.error = hasError
      state.errorMsg = errorMsg
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    }
  },
  getters: {
    hasError (state) {
      return state.error
    },
    getLoading (state) {
      return state.loading
    },
    getErrorMsg (state) {
      return state.errorMsg
    }
  }
}
