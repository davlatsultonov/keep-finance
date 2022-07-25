export default {
  namespaced: true,
  state: {
    categoryId: undefined,
    categories: null
  },
  mutations: {
    setAll (state, payload) {
      state.categories = payload
    },
    setById (state, payload) {
      state.categoryId = payload
    }
  },
  actions: {
    setAll ({ commit }, payload) {
      commit('setAll', JSON.parse(payload))
    }
  },
  getters: {
    getAll (state) {
      return state.categories
    },
    getById (state) {
      return state.categoryId
    }
  }
}
