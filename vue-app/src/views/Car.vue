<template>
  <v-card :loading="loading">
    <v-card-text>
      <div class="text-right">
        <v-btn color="green" title="crear" fab @click="showCreateDialog">
          <v-icon color="white">mdi-plus</v-icon>
        </v-btn>
      </div>
      <index/>
      <create/>
    </v-card-text>
  </v-card>
</template>

<script>
  import Index from '../components/car/Index';
  import Create from '../components/car/Create';
  import {mapState} from "vuex";
  export default {
    name: 'Car',
    components: {
      Index,
      Create
    },
    methods: {
      showCreateDialog() {
        this.$store.dispatch('car/showCreateDialog', true)
      }
    },
    computed: {
      ...mapState('car', ['loading']),
    },
  }
</script>

<style scoped>

</style>
