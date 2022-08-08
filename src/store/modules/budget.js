import updateArrayInLocalStorage, {
  addItemToLocalStorage,
  makePromise,
  removeItemFromLocalStorage
} from '../../js/helpers'

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
    async edit ({
      commit,
      dispatch,
      state,
      rootGetters
    }, payload) {
      dispatch('setLoading', true, { root: true })
      try {
        await makePromise(function () {
          /* find  budget */
          const index = state.budgets.findIndex(item => item.id === payload.itemId)
          let item = state.budgets.find(item => item.id === payload.itemId)

          /* find remainder which should be added to account amount */
          const editRemainderAmount = item.amount - payload.budget.amount

          /* assign new values to the budget */
          item = Object.assign({}, item, payload.budget)

          /* find account and add remainder */
          const account = rootGetters['accounts/get']
          const accounts = rootGetters['accounts/getAll']
          if (item.isExpense) {
            account.amount += editRemainderAmount
          } else {
            account.amount -= editRemainderAmount
          }

          /* update accounts */
          updateArrayInLocalStorage('accounts', accounts)

          /* replace old values to new */
          const newBudgets = [...state.budgets]
          newBudgets.splice(index, 1, item)

          /* update budgets */
          commit('setAll', newBudgets)
          updateArrayInLocalStorage('budgets', newBudgets)
        }, payload)
        dispatch('setLoading', false, { root: true })
      } catch (e) {
        dispatch('setLoading', false, { root: true })
        throw e
      }
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
    },
    getById (state) {
      return function (id) {
        return state.budgets.find(item => item.id === Number(id))
      }
    }
  }
}
