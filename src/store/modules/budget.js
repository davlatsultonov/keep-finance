import { addItemToLocalStorage, makePromise, removeItemFromLocalStorage } from '../../js/helpers'

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
      const result = JSON.parse(payload).sort((a, b) => b.date - a.date)
      commit('setAll', result)
    },
    add ({ commit }, payload) {
      return makePromise(addItemToLocalStorage('budgets'), payload)
    },
    delete ({
      commit,
      getters
    }, payload) {
      return makePromise(removeItemFromLocalStorage('budgets'), payload)
    }
  },
  getters: {
    getAll (state) {
      return state.budgets
    }
  }
}
