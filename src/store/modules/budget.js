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
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (payload) {
            const budgets = (JSON.parse(localStorage.getItem('budgets')))
            budgets.push(payload)
            localStorage.setItem('budgets', JSON.stringify(budgets))
            resolve()
          } else {
            reject(new Error('Error'))
          }
        }, 500)
      })
    },
    delete ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (payload) {
            const budgets = getters.getAll.filter(item => item.id !== payload)
            commit('setAll', budgets)
            localStorage.setItem('budgets', JSON.stringify(budgets))
            resolve()
          } else {
            reject(new Error('Error'))
          }
        }, 500)
      })
    }
  },
  getters: {
    getAll (state) {
      return state.budgets
    }
  }
}
