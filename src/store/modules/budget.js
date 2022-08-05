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
    setAll ({ commit }) {
      const result = JSON.parse(localStorage.getItem('budgets')).sort((a, b) => b.date - a.date)
      commit('setAll', result)
    },
    add ({ commit }, payload) {
      return makePromise(addItemToLocalStorage('budgets'), payload)
    },
    delete (store, payload) {
      return makePromise(removeItemFromLocalStorage('budgets'), payload)
    },
    updateByAccount ({ commit }, payload) {
      return makePromise(function (payload) {
        const result = JSON.parse(localStorage.getItem('budgets')).filter(item => item.account.id !== payload)
        commit('setAll', result)
        localStorage.setItem('budgets', JSON.stringify(result))
      }, payload)
    }
  },
  getters: {
    getAll (state) {
      return state.budgets
    }
  }
}
