<template>
  <v-list
    two-line
    v-if="budgetItems.length && accountExists"
  >
    <div  class="mb-4" v-for="(budgets, day, index) in budgetItemsByDays" :key="index">
      <v-subheader class="blue lighten-4 d-inline-flex mb-2 font-weight-bold rounded-xl" style="height: 30px">{{
          formatDate(today) === day ? 'Today' : (formatDate(yesterday) === day ? 'Yesterday' : day)
        }}
      </v-subheader>
      <v-list-item class="white rounded-lg elevation-2 my-3" v-for="(budget, subIndex) of budgets" :key="subIndex">
        <v-list-item-icon>
          <v-icon large :color="budget.isIncome ? 'green' : null">
            {{ 'mdi-' + (budget.isExpense ? categories[budget.category.name] : 'cash-check') }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-if="budget.title">{{ budget.title }}</v-list-item-title>
          <v-list-item-subtitle v-if="budget.description" class="my-2">{{ budget.description }}</v-list-item-subtitle>
          <v-list-item-subtitle v-if="budget" :class="{ 'mt-2': !budget.description }">
            <v-icon x-small :color="budget.isIncome ? 'success' : 'error'">
              {{ 'mdi-trending-' + (budget.isIncome ? 'up' : 'down') }}
            </v-icon>
            {{ account(budget.accountId).name }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-speed-dial
            direction="left"
            transition="slide-y-reverse-transition"
            class="mb-2"
          >
            <template v-slot:activator>
              <v-btn
                color="grey"
                fab
                icon
                small
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-btn
              fab
              dark
              small
              color="green"
              :to="{
                path: '/budget',
                query: {
                  mode: 'edit',
                  type: budget.isIncome ? 'income' : 'expense',
                  id: budget.id
                }
              }"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="red"
              @click="deleteBudgetItem(budget)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-speed-dial>
          <v-list-item-title :style="{
                color: budget.isIncome ? '#4caf50 ' : '#ff5252'
              }">
            {{ budget.isIncome ? '+' : '-' }} {{ formatMoney(budget.amount) }}
          </v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </div>
  </v-list>
  <h1
    v-else
    class="text-h5 text-center mt-5"
  >Nothing to show</h1>
</template>

<script>
import { TODAY, YESTERDAY } from '../js/constants/days'
import { CATEGORIES_ICON } from '../js/constants/categories'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import FormatMoney from '../js/mixins/FormatMoney'

export default {
  name: 'Dashboard',
  mixins: [FormatMoney],
  data () {
    return {
      today: TODAY,
      yesterday: YESTERDAY,
      categories: CATEGORIES_ICON
    }
  },
  computed: {
    ...mapGetters({
      budgetItems: 'budget/getAll',
      accounts: 'accounts/getAll',
      accountExists: 'accounts/accountExists'
    }),
    account () {
      return function (id) {
        return this.accounts.find(acc => acc.id === id)
      }
    },
    budgetItemsByDays () {
      const result = {}

      this.budgetItems.forEach(item => {
        const date = this.formatDate(new Date(item.date))
        if (result[date]) {
          result[date].push(item)
          return
        }

        result[date] = []
        result[date].push(item)
      })

      return result
    }
  },
  methods: {
    formatDate (date) {
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      return `${this.formatNumber(day)}-${this.formatNumber(month)}-${year}`
    },
    formatNumber (n) {
      return n < 10 ? '0' + n : n
    },
    deleteBudgetItem (budget) {
      this.deleteBudget(budget.id)
        .then(() => {
          this.updateAccount({
            sign: budget.isExpense ? '+' : '-',
            amount: budget.amount,
            accountId: budget.account.id
          })
          this.setAllBudgets()
        })
        .catch((e) => console.log(e))
    },
    ...mapMutations({
      setAccount: 'accounts/setAccount'
    }),
    ...mapActions({
      deleteBudget: 'budget/delete',
      updateAccount: 'accounts/updateAccount',
      setAllBudgets: 'budget/setAll'
    })
  }
}
</script>

<style scoped>

</style>
