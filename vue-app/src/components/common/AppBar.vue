<template>
  <v-card>
    <v-navigation-drawer
      v-show="user.isAdmin"
      v-model="drawer"
      app
    >
      <v-list nav dense>
        <v-list-item-group color="primary">
          <router-link :to="{name: 'users.index'}" tag="span" v-show="user.isAdmin">
            <v-list-item link color="primary">
              <v-list-item-action>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link :to="{name: 'cars.index'}" tag="span">
            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-credit-card</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Vehículos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-show="user.isAdmin"/>
      <v-toolbar-title>Control Vehicular</v-toolbar-title>
      <v-spacer/>
      {{ user.email }}
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-card>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'AppBar',
    data() {
      return {
        drawer: false,
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
      }
    },
    computed: {
      ...mapState('auth', ['user']),
    }
  }
</script>

<style scoped>

</style>
