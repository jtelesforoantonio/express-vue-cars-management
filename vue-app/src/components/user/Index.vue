<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Email</th>
          <th class="text-left">Admin</th>
          <th class="text-left">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ user.name}}</td>
          <td>{{ user.email}}</td>
          <td>
            <v-chip
              small
              :color="user.isAdmin ? 'green' : 'secondary'"
              text-color="white"
            >
              {{ user.isAdmin ? 'Si' : 'No'}}
            </v-chip>
          </td>
          <td>
            <v-btn icon color="primary" title="editar" @click="showEditDialog(index, user)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="error" title="eliminar" @click="showDeleteDialog(index, user)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <edit/>
    <delete/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Edit from './Edit';
  import Delete from './Delete';

  export default {
    name: 'Index',
    components: {
      Edit,
      Delete
    },
    mounted() {
      this.index();
    },
    methods: {
      index() {
        this.$store.dispatch('user/index');
      },
      showEditDialog(index, user) {
        this.$store.dispatch('user/showEditDialog', true);
        this.$store.dispatch('user/setUserToEdit', {index, ...user});
      },
      showDeleteDialog(index, user) {
        this.$store.dispatch('user/showDeleteDialog', true);
        this.$store.dispatch('user/setUserToDelete', {index, ...user});
      }
    },
    computed: {
      ...mapState('user', ['users']),
    }
  }
</script>

<style scoped>

</style>
