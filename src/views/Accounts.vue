<template>
  <v-list nav v-if="accounts && accounts.length">
    <v-hover
      v-for="(item, index) in accounts"
      :key="item.id"
      v-slot="{ hover }"
    >
      <v-list-item
        :style="{
          'border': '1px solid',
          'border-color': item.id === account.id ? '#64b5f6' : 'transparent'
        }"
        @click="selectAccountHandler(index)"
      >
        <v-list-item-icon>
          <v-icon>{{ 'mdi-' + item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
        <v-spacer/>
        <div class="d-flex align-center">
          <div class="mr-2 font-weight-bold" style="line-height: normal">
            {{ formatMoney(item.amount) }}
          </div>
          <div v-if="hover">
            <v-btn
              icon
              depressed
              small
              color="red"
              class="my-1"
              @click.native.stop="deleteAccountHandler(item.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              icon
              depressed
              small
              color="green"
              class="my-1"
              :to="{
                path: '/account',
                query: {
                  mode: 'edit',
                  id: item.id
                }
              }"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>
        </div>
      </v-list-item>
    </v-hover>
  </v-list>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import FormatMoney from '../js/mixins/FormatMoney'
import { getCookie, setCookie } from '../js/helpers'

export default {
  name: 'Accounts',
  mixins: [FormatMoney],
  computed: {
    ...mapGetters({
      account: 'accounts/get',
      accounts: 'accounts/getAll',
      accountId: 'accounts/getId',
      accountExists: 'accounts/accountExists'
    })
  },
  methods: {
    deleteAccountHandler (id) {
      if (!confirm('This will delete all your budgets with this account, continue?')) return
      this.deleteAccount(id).then(() => {
        if (this.account.id === id) {
          this.selectAccount(undefined)
          document.cookie = 'hasKeepFinanceAccount=; Max-Age=-99999999;'
          this.$router.push('/').catch(e => console.log(e))
        }
        this.updateBudgetByAccount(id)
        return this.setAllAccounts()
      })
        .then(() => {
          this.setLoading(false)
        })
        .catch(e => console.log(e))
    },
    selectAccountHandler (id) {
      if (getCookie('hasKeepFinanceAccount') === String(id)) return
      this.selectAccount(id)
      setCookie('hasKeepFinanceAccount', String(id), 365)
    },
    ...mapMutations({
      setAccount: 'accounts/setAccount'
    }),
    ...mapActions({
      deleteAccount: 'accounts/delete',
      setAllAccounts: 'accounts/setAll',
      selectAccount: 'accounts/selectAccount',
      updateBudgetByAccount: 'budget/updateByAccount',
      setLoading: 'setLoading'
    })
  }
}
</script>

<style scoped>
.list-active {
  background-color: green;
}
</style>
