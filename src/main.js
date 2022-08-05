import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { getCookie } from './js/helpers'
import { mapActions } from 'vuex'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    const hasKeepFinanceAccount = getCookie('hasKeepFinanceAccount')
    this.setAllAccounts()
    this.setAllBudgets()
    this.setAllCategories()
    if (hasKeepFinanceAccount && hasKeepFinanceAccount !== 'undefined') {
      this.selectAccount(parseInt(hasKeepFinanceAccount))
    } else {
      this.$router.push('/').catch(e => console.log(e))
    }
  },
  methods: {
    ...mapActions({
      setAllBudgets: 'budget/setAll',
      setAllAccounts: 'accounts/setAll',
      setAllCategories: 'categories/setAll',
      selectAccount: 'accounts/selectAccount'
    })
  }
}).$mount('#app')
