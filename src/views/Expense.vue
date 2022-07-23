<template>
  <div class="mb-5">
    <v-text-field
      prepend-icon="mdi-calculator-variant"
      append-icon="mdi-currency-usd"
      @click:prepend="showCalc = !showCalc"
      v-model="amount"
    >
    </v-text-field>
    <v-subheader class="ml-4" inset>
      Accounts
    </v-subheader>
    <v-item-group
      v-model="accountId"
    >
      <v-row>
        <v-col v-for="account in accounts" :key="account.id" cols="4" sm="4">
          <v-item v-slot="{ active, toggle }">
            <v-card
              elevation="1"
              :color="active ? 'blue-grey' : ''"
              :dark="active"
              class="d-flex flex-column align-center justify-center"
              @click="toggle">
              <v-card-subtitle class="py-2 font-weight-bold">{{ account.name }}</v-card-subtitle>
              <v-icon large>{{ 'mdi-' + account.icon }}</v-icon>
              <v-card-subtitle class="py-2 font-weight-bold">{{ account.amount + '$' }}</v-card-subtitle>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <v-subheader class="ml-4" inset>
      Categories
    </v-subheader>

    <v-item-group
      v-model="categoryId"
    >
      <v-row no-gutters>
        <v-col v-for="category in categories" :key="category.id" cols="4" sm="4">
          <v-item v-slot="{ active, toggle }">
            <v-card
              outlined
              tile
              :color="active ? 'blue-grey' : ''"
              :dark="active"
              class="d-flex flex-column align-center justify-center"
              @click="toggle">
              <v-card-subtitle class="py-2">
                <span class="d-block font-weight-bold text-truncate" style="max-width: 100px;">{{ category.name }}</span>
              </v-card-subtitle>
              <v-icon class="mb-5" large>{{ 'mdi-' + category.icon }}</v-icon>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

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
      amount: '0',
      accountId: 0,
      categoryId: null,
      accounts: [
        {
          id: 1,
          name: 'Cash',
          amount: 12000,
          icon: 'wallet'
        },
        {
          id: 2,
          name: 'Total',
          amount: 20000,
          icon: 'bank'
        }
      ],
      categories: [
        {
          id: 1,
          name: 'Food',
          icon: 'food-fork-drink'
        },
        {
          id: 2,
          name: 'Home',
          icon: 'home-city'
        },
        {
          id: 3,
          name: 'Medicine',
          icon: 'pill'
        },
        {
          id: 4,
          name: 'Shop',
          icon: 'cart-minus'
        },
        {
          id: 5,
          name: 'Transport',
          icon: 'train-car'
        },
        {
          id: 6,
          name: 'Entertainment',
          icon: 'party-popper'
        },
        {
          id: 7,
          name: 'Personal',
          icon: 'account-circle'
        }
      ]
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
