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
      <v-spacer></v-spacer>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            fab
            v-bind="attrs"
            v-on="on"
            to="/newAccount"
          >
            <v-icon>mdi-cash-plus</v-icon>
          </v-btn>
        </template>
        <span>Add a new <b>Account</b></span>
      </v-tooltip>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            fab
            v-bind="attrs"
            v-on="on"
            to="/newCategory"
          >
            <v-icon>mdi-view-grid-plus</v-icon>
          </v-btn>
        </template>
        <span>Add a new <b>Category</b></span>
      </v-tooltip>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="error"
            fab
            to="/expense"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </template>
        <span>Add expenses</span>
      </v-tooltip>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="success"
            fab
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add incomes</span>
      </v-tooltip>
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
      shift
      app
      color="blue"
      grow
    >
      <v-btn to="/">
        <span>Dashboard</span>
        <v-icon>mdi-format-list-text</v-icon>
      </v-btn>

      <v-btn to="/summary">
        <span>Summary</span>
        <v-icon>mdi-chart-donut</v-icon>
      </v-btn>

      <v-btn to="/expense">
        <span>Expense</span>
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
