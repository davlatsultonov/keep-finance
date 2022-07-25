export default {
  namespaced: true,
  state: {
    accountId: undefined,
    accounts: null
  },
  mutations: {
    setAll (state, payload) {
      state.accounts = payload
    },
    setById (state, payload) {
      state.accountId = payload
    }
  },
  actions: {
    setAll ({ commit }, payload) {
      commit('setAll', JSON.parse(payload))
    }
  },
  getters: {
    getAll (state) {
      return state.accounts
    },
    getByName (state) {
      return function (accountName) {
        return state.accounts.find(acc => acc.name === accountName)
      }
    },
    getById (state) {
      return state.accountId
    }
  }
}
