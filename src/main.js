import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    this.$store.dispatch('budget/setAll', localStorage.getItem('budgets'))
    this.$store.dispatch('accounts/setAll', localStorage.getItem('accounts'))
    this.$store.dispatch('categories/setAll', localStorage.getItem('categories'))
  }
}).$mount('#app')
