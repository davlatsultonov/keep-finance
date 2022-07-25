import Vue from 'vue'
import Vuex from 'vuex'
import accounts from './modules/account'
import categories from './modules/categories'
import budget from './modules/budget'
import shared from './modules/shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    accounts, categories, budget, shared
  }
})
