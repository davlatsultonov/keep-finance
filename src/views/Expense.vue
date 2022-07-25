<template>
  <div class="mb-5">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        prepend-icon="mdi-calculator-variant"
        append-icon="mdi-currency-usd"
        @click:prepend="showCalc = !showCalc"
        v-model="amount"
        :rules="[fieldRules.required, fieldRules.price]"
        required
      >
      </v-text-field>

      <v-text-field
        v-model="title"
        label="Title"
        :rules="[fieldRules.required, fieldRules.text]"
        required
      >
      </v-text-field>

      <v-text-field
        v-model="description"
        label="Description"
      >
      </v-text-field>
    </v-form>

    <app-selectable-group
      v-model="accountId"
      :selected="accountId"
      title="Account"
      :group-items="accountArr">
      <template v-slot:default="{ data }">
        <app-selectable-group-item
          :item="data.groupItem"
          :active="data.active"
          :toggle="data.toggle"
        />
      </template>
    </app-selectable-group>

    <app-selectable-group
      v-model="categoryId"
      :selected="categoryId"
      title="Category"
      :group-items="categoryArr">
      <template v-slot:default="{ data }">
        <app-selectable-group-item
          :item="data.groupItem"
          :active="data.active"
          :toggle="data.toggle"
        />
      </template>
    </app-selectable-group>

    <v-snackbar
      v-model="error"
      :timeout="5000"
      color="red"
    >
      Pick from groups

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="error = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-btn
      color="pink"
      dark
      fixed
      fab
      id="finish-btn"
      elevation="2"
      @click="createExpense"
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
import SelectableGroup from '../components/SelectableGroup/SelectableGroup'
import SelectableGroupItem from '../components/SelectableGroup/SelectableGroupItem'

export default {
  name: 'Expense',
  components: {
    'app-calculator': Calculator,
    'app-selectable-group': SelectableGroup,
    'app-selectable-group-item': SelectableGroupItem
  },
  data () {
    return {
      error: false,
      valid: false,
      fieldRules: {
        required: v => !!v || 'Field is required',
        price: v => {
          const n = Number(v)
          if (isNaN(n)) return 'Enter a number'
          return n > 0 || 'Value should be greater than 0'
        },
        text: v => !!v || 'Enter a title'
      },
      showCalc: false,
      amount: '1',
      title: '1',
      description: '1',
      accountId: undefined,
      accountArr: [
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
      categoryId: undefined,
      categoryArr: [
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
  methods: {
    createExpense () {
      if (!this.$refs.form.validate()) return
      if (!this.accountId || !this.categoryId) {
        this.error = true
        return
      }
      const expense = {
        title: this.title,
        description: this.description,
        category: this.categoryArr[this.categoryId].name,
        account: this.accountArr[this.accountId].name,
        isExpense: true,
        isIncome: false,
        amount: parseInt(this.amount)
      }

      this.reset()
      console.log(expense)
    },
    reset () {
      this.$refs.form.reset()
      this.accountId = this.categoryId = undefined
    }
  }
}
</script>

<style scoped>
#finish-btn {
  right: 20px;
  bottom: 80px;
}
</style>
