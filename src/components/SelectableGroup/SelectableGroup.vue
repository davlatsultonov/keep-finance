<template>
  <div>
    <v-subheader class="ml-4" inset>
      {{ title }}
    </v-subheader>
    <v-item-group
      v-model="selectedItemValue"
    >
      <v-row :no-gutters="noGutters">
        <v-col v-for="item in groupItems" :key="item.id" cols="4" sm="4">
          <v-item v-slot="{ active, toggle }">
            <slot :data="{
              active, toggle, groupItem: item
            }"></slot>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<script>
export default {
  model: {
    props: 'selected',
    event: 'change'
  },
  name: 'SelectableGroup',
  props: {
    title: {
      type: String,
      required: true
    },
    groupItems: {
      type: Array,
      required: true
    },
    selected: {
      type: Number,
      default: () => undefined
    },
    noGutters: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    selectedItemValue: undefined
  }),
  watch: {
    selectedItemValue (v) {
      this.$emit('change', v)
    },
    selected (v) {
      this.selectedItemValue = v
    }
  }
}
</script>

<style scoped>

</style>
