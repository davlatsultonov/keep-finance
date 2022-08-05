export default {
  computed: {
    isExpense () {
      return this.$route.query.type === 'expense'
    },
    isIncome () {
      return this.$route.query.type === 'income'
    }
  }
}
