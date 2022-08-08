<template>
  <div class="mb-5">
    <v-expansion-panels multiple hover popout v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header>
          Data
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              prepend-icon="mdi-calculator-variant"
              append-icon="mdi-currency-usd"
              @click:prepend="showCalc = !showCalc"
              v-model="amount"
              :rules="[fieldRules.required, fieldRules.price]"
              required
              @change="changePanel"
            >
            </v-text-field>

            <v-text-field
              v-model="title"
              label="Title"
              :rules="[fieldRules.required, fieldRules.text]"
              required
              @change="changePanel"
            >
            </v-text-field>

            <v-text-field
              v-model="description"
              label="Description"
            >
            </v-text-field>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Account
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <transition name="fade">
            <app-selectable-group
              @change="$store.dispatch('accounts/selectAccount', $event)"
              :selected="accountId"
              :mobile-col-count="6"
              :group-items="accounts">
              <template v-slot:default="{ data }">
                <app-selectable-group-item
                  :item="data.groupItem"
                  :active="data.active"
                  :toggle="data.toggle"
                  @click.native="changePanel"
                />
              </template>
            </app-selectable-group>
          </transition>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="isExpense">
        <v-expansion-panel-header>
          Category
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <transition name="fade">
            <app-selectable-group
              no-gutters
              @change="id => setCategoryId(id)"
              :selected="categoryId"
              :group-items="categories">
              <template v-slot:default="{ data }">
                <app-selectable-group-item
                  :item="data.groupItem"
                  :active="data.active"
                  :toggle="data.toggle"
                  :flat="data.flat"
                />
              </template>
            </app-selectable-group>
          </transition>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-btn
      class="hidden-md-and-up"
      color="primary"
      dark
      fixed
      right
      fab
      elevation="2"
      small
      style="bottom: 185px;"
      @click="showCheck = !showCheck"
    >
      <v-icon>mdi-format-list-numbered</v-icon>
    </v-btn>

    <v-btn
      v-if="isEditing"
      color="green"
      dark
      fixed
      right
      elevation="2"
      @click="editBudgetHandler"
      style="bottom: 80px;"
    >
      Save edit
    </v-btn>
    <v-btn
      v-else
      color="pink"
      dark
      fixed
      right
      fab
      elevation="2"
      @click="createBudget"
      style="bottom: 70px;"
    >
      <v-icon>mdi-check</v-icon>
    </v-btn>

    <v-dialog
      width="40%"
      v-model="showCalc">
      <app-calculator v-model="amount" @calc-close="showCalc = $event"></app-calculator>
    </v-dialog>

    <v-sheet
      :class="['check elevation-3', !showCheck ? 'hidden-sm-and-down' : null]"
      color="cyan lighten-5"
      rounded
    >
      <v-simple-table dense class="check-table">
        <template v-slot:default>
          <tbody>
          <tr v-if="isEditing">
            <td colspan="2" class="text-center font-italic">Editing</td>
          </tr>
          <tr>
            <td>Budget type:</td>
            <td class="font-weight-bold">{{ isIncome ? 'Income' : 'Expense' }}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td class="font-weight-bold">{{ amount.length ? formatMoney(amount) : 0 }}</td>
          </tr>
          <tr>
            <td>Title:</td>
            <td class="font-weight-bold">{{ title.length ? title : '' }}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td style="max-width: 200px;" class="font-weight-bold">{{ description.length ? description : '' }}</td>
          </tr>
          <tr>
            <td>Account</td>
            <td class="font-weight-bold">{{ accountId !== undefined ? account.name : '' }}</td>
          </tr>
          <tr v-if="isExpense">
            <td>Category</td>
            <td class="font-weight-bold">{{ categoryId !== undefined ? categories[categoryId].name : '' }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-sheet>

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
  </div>
</template>

<script>
import Calculator from '../components/Calculator/Calculator'
import SelectableGroup from '../components/SelectableGroup/SelectableGroup'
import SelectableGroupItem from '../components/SelectableGroup/SelectableGroupItem'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import FormatMoney from '../js/mixins/FormatMoney'
import BudgetType from '../js/mixins/Budget/BudgetType'
import BudgetMode from '../js/mixins/Budget/BudgetMode'

export default {
  name: 'Budget',
  components: {
    'app-calculator': Calculator,
    'app-selectable-group': SelectableGroup,
    'app-selectable-group-item': SelectableGroupItem
  },
  mixins: [FormatMoney, BudgetType, BudgetMode],
  data () {
    return {
      showCheck: false,
      panel: [0, 1, 2],
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
      amount: '',
      title: '',
      description: ''
    }
  },
  created () {
    if (this.isEditing) {
      const editingItem = this.getById(this.$route.query.id)
      this.setEditItemData(editingItem)
    }
  },
  methods: {
    setEditItemData ({
      amount,
      title,
      description,
      category
    }) {
      this.amount = amount + ''
      this.title = title
      this.description = description
      if (this.isExpense) this.setCategoryId(this.categories.findIndex(item => item.id === category.id))
    },
    changePanel () {
      /*  const showSecondWindow = (parseInt(this.amount) && parseInt(this.amount) > 0) && this.title.length
      const showThirdWindow = this.accountId !== undefined

      if (showSecondWindow && this.panel.indexOf(1) === -1) {
        this.panel.push(1)
      }

      if (showSecondWindow && showThirdWindow && this.panel.indexOf(2) === -1) {
        this.panel.push(2)
      } */
    },
    createBudget () {
      if (!this.validateFormFields()) return
      const budget = {
        id: new Date().getTime(),
        amount: parseInt(this.amount),
        date: new Date().getTime(),
        title: this.title,
        description: this.description,
        category: this.isExpense ? Object.assign({}, this.categories[this.categoryId]) : null,
        account: Object.assign({}, this.accounts[this.accountId]),
        isExpense: this.isExpense,
        isIncome: this.isIncome
      }
      this.addBudget(budget).then(() => {
        this.updateAccount({
          sign: this.isExpense ? '-' : '+',
          amount: parseInt(this.amount),
          accountId: this.account.id
        })
        this.setAllBudget()
        this.$router.push('/').catch(() => {
        })
        this.reset()
      }).catch(err => console.log(err))
    },
    editBudgetHandler () {
      if (!this.validateFormFields()) return
      const budget = {
        amount: parseInt(this.amount),
        title: this.title,
        description: this.description,
        category: this.isExpense ? Object.assign({}, this.categories[this.categoryId]) : null,
        account: Object.assign({}, this.accounts[this.accountId]),
        isExpense: this.isExpense,
        isIncome: this.isIncome
      }

      this.editBudget({
        itemId: Number(this.$route.query.id),
        budget
      }).then(() => {
        this.$router.push('/')
      })
    },
    validateFormFields () {
      if (!this.$refs.form.validate()) return false
      if (this.isExpense && this.categoryId === undefined) {
        this.setError({
          hasError: true,
          errorMsg: 'Category is not picked'
        })
        return false
      }
      return true
    },
    reset () {
      this.$refs.form.reset()
      this.setCategoryId(undefined)
    },
    ...mapMutations({
      setAccountId: 'accounts/setId',
      setAccount: 'accounts/setAccount',
      setError: 'setError'
    }),
    ...mapActions({
      addBudget: 'budget/add',
      editBudget: 'budget/edit',
      selectAccount: 'accounts/selectAccount',
      updateAccount: 'accounts/updateAccount',
      setAllBudget: 'budget/setAll',
      setCategoryId: 'categories/setId'
    })
  },
  computed: {
    ...mapGetters({
      budgets: 'budget/getAll',
      getById: 'budget/getById',
      accountId: 'accounts/getId',
      accounts: 'accounts/getAll',
      account: 'accounts/get',
      categories: 'categories/getAll',
      categoryId: 'categories/getId',
      hasError: 'hasError',
      errorMsg: 'getErrorMsg'
    })
  }
}
</script>

<style scoped lang="scss">
.check {
  position: fixed;
  left: 390px;
  width: 100%;
  max-width: 245px;
  top: 80px;
  padding: 10px;

  @media only screen and (max-width: 959.58px) {
    max-width: calc(100% - 20px);
    left: 10px;
    right: 10px;
    top: 60px;
    z-index: 100;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
