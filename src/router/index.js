import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import Summary from '../views/Summary'
import Budget from '../views/Budget'
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
    path: '/budget',
    name: 'budget',
    component: Budget
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts
  },
  {
    path: '/account',
    name: 'account',
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
