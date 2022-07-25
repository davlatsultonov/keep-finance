<template>
  <v-list
    subheader
    two-line
  >
    <div v-for="(budgets, day, index) in budgetItemsByDays" :key="index">
      <v-subheader>{{
          formatDate(today) === day ? 'Today' : (formatDate(yesterday) === day ? 'Yesterday' : day)
        }}
      </v-subheader>
      <v-list-item v-for="(budget, subIndex) of budgets" :key="subIndex">
        <v-list-item-icon>
          <v-icon large>
            {{ 'mdi-' + categories[budget.category] }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ budget.title }}</v-list-item-title>
          <v-list-item-subtitle class="my-2">{{ budget.description }}</v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon x-small :color="budget.isIncome ? 'success' : 'error'">
              {{ 'mdi-trending-' + (budget.isIncome ? 'up' : 'down') }}
            </v-icon>
            {{ budget.account }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-title :style="{
                color: budget.isIncome ? '#4caf50 ' : '#ff5252'
              }">
            {{ budget.isIncome ? '+' : '-' }} {{ budget.amount }}$
          </v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { TODAY, YESTERDAY } from '../js/constants/days'
import { CATEGORIES_ICON } from '../js/constants/categories'

export default {
  name: 'Dashboard',
  data () {
    return {
      today: TODAY,
      yesterday: YESTERDAY,
      categories: CATEGORIES_ICON,
      budgetItems: [
        {
          id: 1,
          category: 'Food',
          isExpense: true,
          isIncome: false,
          amount: 200,
          title: 'Ali bobo',
          description: 'Some description',
          date: TODAY,
          account: 'Cash'
        },
        {
          id: 2,
          category: 'Food',
          isExpense: false,
          isIncome: true,
          amount: 200,
          title: 'Ali bobo',
          description: 'Some description',
          date: TODAY,
          account: 'Cash'
        },
        {
          id: 3,
          category: 'Food',
          isExpense: true,
          isIncome: false,
          amount: 200,
          title: 'Ali bobo',
          description: 'Some description',
          date: YESTERDAY,
          account: 'Cash'
        }
      ]
    }
  },
  computed: {
    budgetItemsByDays () {
      const result = {}

      this.budgetItems.forEach(item => {
        const date = this.formatDate(item.date)
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
  created () {
    console.log(this.budgetItemsByDays)
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
    }
  }
}
</script>

<style scoped>

</style>
