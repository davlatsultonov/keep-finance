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
      <div class="ml-auto">
        <v-btn
          icon
          color="error"
          fab
          outlined
          small
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn
          icon
          color="success"
          fab
          outlined
          small
          class="ml-2"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main app>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12"
                 lg="4"
                 md="6"
                 sm="8"
                 class="mx-auto">
            <div>
              <router-view/>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-bottom-navigation
      color="blue"
      grow
    >
      <v-btn to="/">
        <v-icon>mdi-format-list-text</v-icon>
      </v-btn>

      <v-btn to="/summary">
        <v-icon>mdi-view-grid</v-icon>
      </v-btn>

      <v-btn to="/expense">
        <v-icon>mdi-basket</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({}),
  computed: {
    currentPageName () {
      const name = this.$route.name
      return name.slice(0, 1).toUpperCase() + name.slice(1)
    }
  }
}
</script>
