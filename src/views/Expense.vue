<template>
  <div>
    <v-text-field
      prepend-icon="mdi-calculator-variant"
      append-icon="mdi-currency-usd"
      @click:prepend="showCalc = !showCalc"
      v-model="amount"
    >
    </v-text-field>

    <v-btn
      color="pink"
      dark
      fixed
      fab
      id="finish-btn"
      elevation="2"
    >
      <v-icon>mdi-check</v-icon>
    </v-btn>

    <v-dialog
      width="40%"
      v-model="showCalc">
      <app-calculator v-model="amount" @calc-close="showCalc = $event"></app-calculator>
    </v-dialog>
  </div>
</template>

<script>
import Calculator from '../components/Calculator/Calculator'

export default {
  name: 'Expense',
  data () {
    return {
      showCalc: false,
      amount: '0'
    }
  },
  components: {
    'app-calculator': Calculator
  },
  methods: {}
}
</script>

<style scoped>
#finish-btn {
  right: 20px;
  bottom: 80px;
}
</style>
