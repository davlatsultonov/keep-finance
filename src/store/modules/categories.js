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
    setId (state, payload) {
      state.categoryId = payload
    }
  },
  actions: {
    setAll ({ commit }) {
      commit('setAll', JSON.parse(localStorage.getItem('categories')))
    }
  },
  getters: {
    getAll (state) {
      return state.categories
    },
    getId (state) {
      return state.categoryId
    }
  }
}
