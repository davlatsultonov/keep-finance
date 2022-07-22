<template>
  <v-app>
    <v-app-bar
      app
      elevation="4"
      elevate-on-scroll
    >
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        color="error"
        fab
        outlined
        small
        class="mx-2"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-btn
        icon
        color="success"
        fab
        outlined
        small
        class="mx-2"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <v-bottom-navigation
      color="blue"
      grow
      app
    >
      <v-btn>
        <v-icon>mdi-format-list-text</v-icon>
      </v-btn>

      <v-btn>
        <v-icon>mdi-view-grid</v-icon>
      </v-btn>

      <v-btn>
        <v-icon>mdi-basket</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  })
}
</script>
