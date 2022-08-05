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
      <v-expansion-panel>
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
      color="pink"
      dark
      fixed
      right
      fab
      id="finish-btn"
      elevation="2"
      @click="createExpense"
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
      color=" cyan lighten-5"
      rounded
    >
      <v-simple-table dense class="check-table">
        <template v-slot:default>
          <tbody>
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
          <tr>
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

export default {
  name: 'Expense',
  components: {
    'app-calculator': Calculator,
    'app-selectable-group': SelectableGroup,
    'app-selectable-group-item': SelectableGroupItem
  },
  mixins: [FormatMoney],
  data () {
    return {
      showCheck: false,
      panel: [0],
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
  methods: {
    changePanel () {
      const showSecondWindow = (parseInt(this.amount) && parseInt(this.amount) > 0) && this.title.length
      const showThirdWindow = this.accountId !== undefined

      if (showSecondWindow && this.panel.indexOf(1) === -1) {
        this.panel.push(1)
      }

      if (showSecondWindow && showThirdWindow && this.panel.indexOf(2) === -1) {
        this.panel.push(2)
      }
    },
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
        id: new Date().getTime(),
        amount: parseInt(this.amount),
        date: new Date().getTime(),
        title: this.title,
        description: this.description,
        category: this.categories[this.categoryId].name,
        account: Object.assign({}, this.accounts[this.accountId]),
        isExpense: true,
        isIncome: false
      }

      this.addBudget(expense).then(() => {
        this.updateAccount({
          sign: '-',
          amount: this.amount,
          accountId: this.account.id
        })
        this.setAllBudget()
        this.$router.push('/').catch(() => {
        })
        this.reset()
      }).catch(err => console.log(err))
    },
    reset () {
      this.$refs.form.reset()
      this.setCategoryId(undefined)
    },
    ...mapMutations({
      setAccountId: 'accounts/setId',
      setAccount: 'accounts/setAccount',
      setCategoryId: 'categories/setId',
      setError: 'shared/setError'
    }),
    ...mapActions({
      addBudget: 'budget/add',
      selectAccount: 'accounts/selectAccount',
      updateAccount: 'accounts/updateAccount',
      setAllBudget: 'budget/setAll'
    })
  },
  computed: {
    ...mapGetters({
      accountId: 'accounts/getId',
      accounts: 'accounts/getAll',
      account: 'accounts/get',
      categories: 'categories/getAll',
      categoryId: 'categories/getId',
      hasError: 'shared/hasError',
      errorMsg: 'shared/getErrorMsg'
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
  max-height: 188px;
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
