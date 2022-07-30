export default {
  namespaced: true,
  state: {
    accountId: undefined,
    accounts: null,
    account: null
  },
  mutations: {
    setAll (state, payload) {
      state.accounts = payload
    },
    setById (state, payload) {
      state.accountId = payload
    },
    setAccount (state, payload) {
      state.account = state.accounts[payload]
    },
    changeAccountAmount (state, payload) {
      switch (payload.sign) {
        case '-':
          state.account.amount -= payload.amount
          break
        case '+':
          state.account.amount += payload.amount
          break
      }
    }
  },
  actions: {
    setAll ({ commit }, payload) {
      commit('setAll', JSON.parse(payload))
    },
    selectAccount ({
      commit,
      getters
    }, payload) {
      if (getters.accountExists) return
      commit('setById', Number(payload))
      commit('setAccount', payload)
    },
    updateAccounts ({
      commit,
      state
    }, payload) {
      commit('changeAccountAmount', payload)
      localStorage.setItem('accounts', JSON.stringify(state.accounts))
    }
  },
  getters: {
    getAll (state) {
      return state.accounts
    },
    get (state) {
      return state.account
    },
    accountExists (state) {
      return !!state.account
    },
    getId (state) {
      return state.accountId
    }
  }
}
