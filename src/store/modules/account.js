import { addItemToLocalStorage, makePromise, removeItemFromLocalStorage } from '../../js/helpers'

export default {
  namespaced: true,
  state: {
    accountId: undefined,
    accounts: undefined,
    account: undefined
  },
  mutations: {
    setAll (state, payload) {
      state.accounts = payload
    },
    setId (state, payload) {
      state.accountId = payload
    },
    setAccount (state, payload) {
      state.account = payload !== undefined ? state.accounts[payload] : payload
    },
    changeAccountAmount (state, payload) {
      const account = state.accounts.find(item => item.id === payload.accountId)
      switch (payload.sign) {
        case '-':
          account.amount -= payload.amount
          break
        case '+':
          account.amount += payload.amount
          break
      }
    }
  },
  actions: {
    setAll ({ commit }) {
      commit('setAll', JSON.parse(localStorage.getItem('accounts')))
    },
    selectAccount ({
      commit,
      getters,
      state
    }, payload) {
      if (payload === undefined) {
        commit('setId', undefined)
        commit('setAccount', undefined)
        return
      }
      if (payload === state.accountId) return
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
    },
    delete (store, payload) {
      return makePromise(removeItemFromLocalStorage('accounts'), payload)
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
