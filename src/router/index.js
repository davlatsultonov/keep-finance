import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import Summary from '../views/Summary'
import Expense from '../views/Expense'
import ErrorPage from '../components/404/ErrorPage'
import AccountHandler from '../components/AccountHandler/AccountHandler'
import Accounts from '../views/Accounts'

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
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts
  },
  {
    path: '/newAccount',
    name: 'newAccount',
    component: AccountHandler,
    props: true
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
