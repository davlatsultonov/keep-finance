import updateArrayInLocalStorage, { addItemToLocalStorage, deleteCookie, makePromise, removeItemFromLocalStorage } from '../../js/helpers'

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
      const newAmount = payload.amount
      switch (payload.sign) {
        case '-':
          account.amount -= newAmount
          break
        case '+':
          account.amount += newAmount
          break
      }
    }
  },
  actions: {
    async setAll ({ commit, dispatch }) {
      dispatch('setLoading', true, { root: true })

      try {
        await makePromise(function () {
          commit('setAll', JSON.parse(localStorage.getItem('accounts')))
        })
      } catch (e) {
        dispatch('setLoading', false, { root: true })
        throw e
      }
    },
    selectAccount ({
      commit,
      getters,
      state
    }, payload) {
      if (payload === undefined) {
        commit('setId', undefined)
        commit('setAccount', undefined)
        deleteCookie('hasKeepFinanceAccount')
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
    },
    async edit ({
      commit,
      dispatch,
      state,
      rootGetters
    }, payload) {
      dispatch('setLoading', true, { root: true })
      try {
        await makePromise(function () {
          const index = state.accounts.findIndex(item => item.id === payload.itemId)
          let item = state.accounts.find(item => item.id === payload.itemId)
          item = Object.assign({}, item, payload.account)
          const newAccounts = [...state.accounts]
          newAccounts.splice(index, 1, item)
          commit('setAll', newAccounts)
          commit('setAccount', newAccounts.indexOf(item))
          updateArrayInLocalStorage('accounts', newAccounts)
        }, payload)
        dispatch('setLoading', false, { root: true })
      } catch (e) {
        dispatch('setLoading', false, { root: true })
        throw e
      }
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
    },
    getById (state) {
      return function (id) {
        return state.accounts.find(item => item.id === Number(id))
      }
    }
  }
}
