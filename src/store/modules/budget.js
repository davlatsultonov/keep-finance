export default {
  namespaced: true,
  state: {
    budgets: []
  },
  mutations: {
    setAll (state, payload) {
      state.budgets = payload
    }
  },
  actions: {
    setAll ({ commit }, payload) {
      commit('setAll', JSON.parse(payload))
    }
  },
  getters: {
    getAll (state) {
      return state.budgets
    }
  }
}
