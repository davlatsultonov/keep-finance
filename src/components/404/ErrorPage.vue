<template>
  <div class="d-flex flex-column align-center justify-center error-page px-5 py-5">
    <h1 class="text-h1 error--text mb-6">404</h1>
    <v-btn text color="primary" to="/">To Home page</v-btn>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style scoped>
.error-page {
  position: fixed;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
}
</style>
