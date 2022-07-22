import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import Summary from '../views/Summary'
import Expense from '../views/Expense'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/summary',
    name: 'summary',
    component: Summary
  },
  {
    path: '/expense',
    name: 'expense',
    component: Expense
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
