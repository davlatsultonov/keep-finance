<template>
  <div>
    <h1>Dashboard</h1>
    <app-calculator></app-calculator>
  </div>
</template>

<script>
import Calculator from '../components/Calculator/Calculator'

export default {
  name: 'Dashboard',
  components: {
    'app-calculator': Calculator
  }
}
</script>

<style scoped>

</style>
