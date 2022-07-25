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
      @change="id => setAccountId(id)"
      :selected="accountId"
      title="Account"
      :group-items="accounts">
      <template v-slot:default="{ data }">
        <app-selectable-group-item
          :item="data.groupItem"
          :active="data.active"
          :toggle="data.toggle"
        />
      </template>
    </app-selectable-group>

    <app-selectable-group
      @change="id => setCategoryId(id)"
      :selected="categoryId"
      title="Category"
      :group-items="categories">
      <template v-slot:default="{ data }">
        <app-selectable-group-item
          :item="data.groupItem"
          :active="data.active"
          :toggle="data.toggle"
        />
      </template>
    </app-selectable-group>

    <v-snackbar
      v-model="hasError"
      :timeout="5000"
      color="red"
    >
      {{ errorMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="setError({ hasError: false, errorMsg: '' })"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { TODAY } from '../js/constants/days'

export default {
  name: 'Expense',
  components: {
    'app-calculator': Calculator,
    'app-selectable-group': SelectableGroup,
    'app-selectable-group-item': SelectableGroupItem
  },
  data () {
    return {
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
      description: '1'
    }
  },
  methods: {
    createExpense () {
      if (!this.$refs.form.validate()) return
      if (!(this.accountId !== undefined) || !(this.categoryId !== undefined)) {
        this.setError({
          hasError: true,
          errorMsg: (!(this.accountId !== undefined) ? 'Account ' : 'Category') + 'is not picked'
        })
        return
      }
      const expense = {
        id: new Date().valueOf(),
        amount: parseInt(this.amount),
        date: TODAY.getTime(),
        title: this.title,
        description: this.description,
        category: this.categories[this.categoryId].name,
        account: this.accounts[this.accountId].name,
        isExpense: true,
        isIncome: false
      }

      this.addBudget(expense).then(() => {
        this.setAllBudget(localStorage.getItem('budgets'))
        this.$router.push('/').catch(() => {})
        this.reset()
      }).catch(err => console.log(err))
    },
    reset () {
      this.$refs.form.reset()
      this.setAccountId(undefined)
      this.setCategoryId(undefined)
    },
    ...mapMutations({
      setAccountId: 'accounts/setById',
      setCategoryId: 'categories/setById'
    }),
    ...mapActions({
      setError: 'shared/setError',
      addBudget: 'budget/add',
      setAllBudget: 'budget/setAll'
    })
  },
  computed: {
    ...mapGetters({
      account: 'accounts/getByName',
      accountId: 'accounts/getById',
      accounts: 'accounts/getAll',
      categories: 'categories/getAll',
      categoryId: 'categories/getById',
      hasError: 'shared/hasError',
      errorMsg: 'shared/getErrorMsg'
    })
  }
}
</script>

<style scoped>
#finish-btn {
  right: 20px;
  bottom: 80px;
}
</style>
