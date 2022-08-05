<template>
  <div class="mb-5">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        prepend-icon="mdi-currency-usd"
        v-model="amount"
        :rules="[fieldRules.required, fieldRules.amount]"
        required
        label="How much money do you have?"
      >
      </v-text-field>

      <v-text-field
        v-model="name"
        label="Your new account name"
        :rules="[fieldRules.required, fieldRules.name]"
        required
      >
      </v-text-field>
    </v-form>

    <app-selectable-group
      no-gutters
      v-model="iconId"
      :group-items="accountsIcon">
      <template v-slot:default="{ data }">
        <app-selectable-group-item
          :item="data.groupItem"
          :active="data.active"
          :toggle="data.toggle"
          :flat="data.flat"
        />
      </template>
    </app-selectable-group>

    <v-btn
      v-if="showAddBtn"
      color="primary"
      class="float-right"
      @click="createAccount"
    >
      Add
    </v-btn>
  </div>
</template>

<script>
import SelectableGroup from '../SelectableGroup/SelectableGroup'
import SelectableGroupItem from '../SelectableGroup/SelectableGroupItem'
import { ACCOUNTS_ICON } from '../../js/constants/accounts'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AccountHandler',
  components: {
    'app-selectable-group': SelectableGroup,
    'app-selectable-group-item': SelectableGroupItem
  },
  data: () => ({
    valid: false,
    iconId: undefined,
    name: '',
    amount: '',
    fieldRules: {
      required: v => !!v || 'Field is required',
      amount: v => {
        const n = Number(v)
        if (isNaN(n)) return 'Enter a number'
        return n > 0 || 'Value should be greater than 0'
      },
      name: v => !!v || 'Enter a name'
    },
    accountsIcon: Object.values(ACCOUNTS_ICON)
  }),
  computed: {
    showAddBtn () {
      return parseInt(this.amount) > 0 && this.name.length && this.iconId !== undefined
    },
    ...mapGetters({
      accounts: 'accounts/getAll'
    })
  },
  methods: {
    createAccount () {
      if (!this.$refs.form.validate()) return
      const account = {
        id: new Date().getTime(),
        name: this.name,
        amount: parseInt(this.amount),
        icon: this.accountsIcon[this.iconId]
      }
      this.addAccount(account)
        .then(() => {
          this.setAllAccounts()
          this.$router.push('/accounts')
          if (this.accounts.length === 1) {
            this.selectAccount(0)
          }
        }).catch(e => console.log(e))
    },
    ...mapActions({
      addAccount: 'accounts/add',
      setAllAccounts: 'accounts/setAll',
      selectAccount: 'accounts/selectAccount'
    })
  }
}
</script>

<style scoped>

</style>
