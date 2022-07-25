<template>
  <v-card
    :color="active ? 'blue-grey' : ''"
    :dark="active"
    :tile="flat"
    :outlined="flat"
    :elevation="flat ? 0 : 1"
    class="d-flex flex-column align-center justify-center"
    @click="toggle">
    <v-card-subtitle
      class="py-2 font-weight-bold"
      v-if="item.name"
    >{{ item.name }}
    </v-card-subtitle>
    <v-icon
      v-if="item.icon"
      large
      :class="{ 'mb-5': !item.amount }"
    >{{ 'mdi-' + item.icon }}
    </v-icon>
    <v-card-subtitle v-if="item.amount" class="py-2 font-weight-bold">{{ item.amount + '$' }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'Accounts',
  props: {
    active: Boolean,
    toggle: Function,
    flat: {
      type: Boolean,
      default: () => false
    },
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
