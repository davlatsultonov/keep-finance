import { addItemToLocalStorage, makePromise } from '../../js/helpers'

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
    setId (state, payload) {
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
      commit('setId', Number(payload))
      commit('setAccount', payload)
    },
    updateAccount ({
      commit,
      state
    }, payload) {
      return makePromise(() => {
        commit('changeAccountAmount', payload)
        localStorage.setItem('accounts', JSON.stringify(state.accounts))
      }, payload)
    },
    add ({ commit }, payload) {
      return makePromise(addItemToLocalStorage('accounts'), payload)
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
