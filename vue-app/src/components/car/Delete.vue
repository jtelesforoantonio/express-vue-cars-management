<template>
  <v-row justify="center">
    <v-dialog persistent v-model="showDeleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Eliminar vehículo</v-card-title>
        <v-card-text>
          ¿Estas seguro de querer eliminar este registro?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="red" text @click="destroy" :loading="isDeleting">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'Delete',
    data() {
      return {
        car: {
          index: '',
          id: '',
          plate: '',
          brand: '',
          color: '',
          model: '',
          position: {
            lat: '',
            lng: ''
          }
        }
      }
    },
    methods: {
      closeDialog() {
        this.$store.dispatch('car/showDeleteDialog', false);
      },
      destroy() {
        this.$store.dispatch('car/destroy', this.car);
      }
    },
    computed: {
      ...mapState('car', ['showDeleteDialog', 'isDeleting']),
    },
    watch: {
      showDeleteDialog(val) {
        if (val) {
          const carToDelete = this.$store.state.car.carToDelete;
          Object.assign(this.car, carToDelete);
        }
      }
    }
  }
</script>

<style scoped>

</style>
