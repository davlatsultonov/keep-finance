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
      @change="iconId = $event"
      :selected="iconId"
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
      v-if="isEditing && showAddBtn"
      color="green"
      dark
      class="float-right"
      @click="editAccountHandler"
    >
      Save
    </v-btn>

    <v-btn
      v-if="!isEditing && showAddBtn"
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
import Mode from '../../js/mixins/Mode'

export default {
  name: 'AccountHandler',
  components: {
    'app-selectable-group': SelectableGroup,
    'app-selectable-group-item': SelectableGroupItem
  },
  mixins: [Mode],
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
  created () {
    if (this.isEditing) {
      const editingItem = this.accountById(this.$route.query.id)
      this.setEditItemData(editingItem)
    }
  },
  computed: {
    showAddBtn () {
      return parseInt(this.amount) > 0 && this.name.length && this.iconId !== undefined
    },
    ...mapGetters({
      accounts: 'accounts/getAll',
      accountById: 'accounts/getById'
    })
  },
  methods: {
    setEditItemData ({
      name,
      amount,
      icon
    }) {
      this.name = name + ''
      this.amount = amount
      this.iconId = this.accountsIcon.findIndex(iconText => iconText === icon)
    },
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
          this.setLoading(false)
        })
        .then(() => {
          this.$router.push('/accounts')
          if (this.accounts.length === 1) {
            this.selectAccount(0)
          }
        })
        .catch(e => console.log(e))
    },
    editAccountHandler () {
      const account = {
        name: this.name,
        amount: parseInt(this.amount),
        icon: this.accountsIcon[this.iconId]
      }

      this.editAccount({
        itemId: Number(this.$route.query.id),
        account
      }).then(() => {
        this.$router.push('/accounts')
      })
    },
    ...mapActions({
      addAccount: 'accounts/add',
      editAccount: 'accounts/edit',
      setAllAccounts: 'accounts/setAll',
      selectAccount: 'accounts/selectAccount',
      setLoading: 'setLoading'
    })
  }
}
</script>

<style scoped>

</style>
