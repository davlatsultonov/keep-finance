<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      elevation="2"
    >
      <v-toolbar-title>
        {{ currentPageName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="accountExists">
        {{ account.name }}: <b>{{ formatMoney(account.amount) }}</b>
      </v-toolbar-title>
      <v-spacer v-if="accountExists"/>
      <v-tooltip bottom color="primary" v-if="accounts.length">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            fab
            v-bind="attrs"
            v-on="on"
            to="/accounts"
          >
            <v-icon>mdi-cash</v-icon>
          </v-btn>
        </template>
        <span>View your <b>Accounts</b></span>
      </v-tooltip>
      <v-divider class="mx-2" vertical />
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            fab
            v-bind="attrs"
            v-on="on"
            to="/newAccount"
          >
            <v-icon>mdi-cash-plus</v-icon>
          </v-btn>
        </template>
        <span>Add a new <b>Account</b></span>
      </v-tooltip>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            fab
            v-bind="attrs"
            v-on="on"
            to="/newCategory"
          >
            <v-icon>mdi-view-grid-plus</v-icon>
          </v-btn>
        </template>
        <span>Add a new <b>Category</b></span>
      </v-tooltip>
    </v-app-bar>
    <v-main app>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12"
                 lg="4"
                 md="6"
                 sm="8"
                 class="mx-auto">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-bottom-navigation
      shift
      app
      color="blue"
      grow
    >
      <v-btn to="/" exact :disabled="!accountExists">
        <span>Dashboard</span>
        <v-icon>mdi-format-list-text</v-icon>
      </v-btn>

      <v-btn to="/summary" exact :disabled="!accountExists">
        <span>Summary</span>
        <v-icon>mdi-chart-donut</v-icon>
      </v-btn>

      <v-btn :to="{
          path: '/budget',
          query: {
            type: 'expense'
          }
        }" exact :disabled="!accountExists">
        <span>Budget</span>
        <v-icon>mdi-basket</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <div v-show="accountExists">
      <v-btn
        elevation="2"
        fixed
        right
        bottom
        color="success"
        fab
        :to="{
          path: '/budget',
          query: {
            type: 'income'
          }
        }"
        small
        style="bottom: 135px"
        v-if="!isIncome"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        elevation="2"
        fixed
        right
        bottom
        color="error"
        fab
        :to="{
          path: '/budget',
          query: {
            type: 'expense'
          }
        }"
        :small="isIncome"
        :style="{
          'bottom': !isIncome && !isExpense ? '70px' : '135px'
        }"
        v-if="!isExpense"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </div>

    <v-dialog
      v-model="showAccounts"
      transition="dialog-bottom-transition"
      max-width="600px"
      persistent
    >
      <div style="overflow-x: hidden">
        <v-toolbar
          tile
          dark
          color="primary"
        >
          <v-toolbar-title>
            {{ accounts.length ? 'Please select an account to continue using this app' : 'You have no account yet' }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text v-if="accounts.length">
            <app-selectable-group
              @change="setAccount"
              :selected="accountId"
              :mobile-col-count="6"
              :group-items="accounts">
              <template v-slot:default="{ data }">
                <app-selectable-group-item
                  :item="data.groupItem"
                  :active="data.active"
                  :toggle="data.toggle"
                />
              </template>
            </app-selectable-group>
          </v-card-text>
          <v-card-text v-else>
            <v-btn text color="primary" to="/newAccount">Add a new account</v-btn>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SelectableGroup from './components/SelectableGroup/SelectableGroup'
import SelectableGroupItem from './components/SelectableGroup/SelectableGroupItem'
import { getCookie, setCookie } from './js/helpers'
import FormatMoney from './js/mixins/FormatMoney'
import BudgetType from './js/mixins/BudgetType'

export default {
  name: 'App',
  components: {
    'app-selectable-group': SelectableGroup,
    'app-selectable-group-item': SelectableGroupItem
  },
  mixins: [FormatMoney, BudgetType],
  data: () => ({}),
  computed: {
    ...mapGetters({
      account: 'accounts/get',
      accounts: 'accounts/getAll',
      accountId: 'accounts/getId',
      accountExists: 'accounts/accountExists'
    }),
    currentPageName () {
      const name = this.$route.name
      return name.slice(0, 1).toUpperCase() + name.slice(1)
    },
    showAccounts () {
      return !this.accountExists && this.$route.name !== 'newAccount'
    }
  },
  methods: {
    ...mapActions({
      selectAccount: 'accounts/selectAccount'
    }),
    setAccount (id) {
      if (isNaN(Number(getCookie('hasKeepFinanceAccount')))) {
        setCookie('hasKeepFinanceAccount', id + '', 365)
        this.selectAccount(id)
      }
    }
  }
}
</script>
