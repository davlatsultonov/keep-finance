<template>
  <v-list nav>
    <v-hover
      v-for="(item, index) in accounts"
      :key="item.id"
      v-slot="{ hover }"
    >
      <v-list-item
        :style="{
          'background-color': account.id === item.id ? '#efefef' : null
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
              @click.native.stop="deleteAccountHandler(item.id)"
            >
              <v-icon>mdi-delete</v-icon>
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
import { setCookie } from '../js/helpers'

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
        this.setAllAccounts()
        this.setLoading(false)
      }).catch(e => console.log(e))
    },
    selectAccountHandler (id) {
      this.selectAccount(id)
      setCookie('hasKeepFinanceAccount', id, 365)
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
