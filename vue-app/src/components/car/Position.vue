<template>
  <v-row justify="center">
    <v-dialog persistent max-width="600px" v-model="showPositionDialog">
      <v-card>
        <v-card-title>
          <span class="headline">Actualizar posición</span>
        </v-card-title>
        <ValidationObserver v-slot="{ handleSubmit }" ref="form">
          <v-card-text>
            <v-container>
              <errors v-show="errors.length" :errors="errors"/>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider name="latitud" rules="required" v-slot="{ errors }">
                    <v-text-field
                      type="number"
                      label="Latitud *"
                      outlined
                      requried
                      :error-messages="errors"
                      v-model="car.lat">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider name="longitud" rules="required" v-slot="{ errors }">
                    <v-text-field
                      type="number"
                      label="Longitud *"
                      outlined
                      required
                      :error-messages="errors"
                      v-model="car.lng">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="green" text @click="handleSubmit(updatePosition)" :loading="isUpdatingPosition">Guardar</v-btn>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import {mapState} from 'vuex';
  import Errors from '../common/Errors';

  export default {
    name: 'Position',
    data() {
      return {
        car: {
          index: '',
          id: '',
          lat: '',
          lng: ''
        }
      }
    },
    components: {
      ValidationObserver,
      ValidationProvider,
      Errors
    },
    methods: {
      clearForm() {
        this.$refs.form.reset();
        this.car.lat = '';
        this.car.lng = '';
      },
      closeDialog() {
        this.clearForm();
        this.$store.dispatch('car/showPositionDialog', false);
      },
      updatePosition() {
        this.car.lat = parseFloat(this.car.lat);
        this.car.lng = parseFloat(this.car.lng);
        this.$store.dispatch('car/updatePosition', this.car);
      },
    },
    computed: {
      ...mapState('car', ['showPositionDialog', 'isUpdatingPosition', 'errors'])
    },
    watch: {
      showPositionDialog(val) {
        if (!val) {
          this.clearForm();
        } else {
          const carToPosition = this.$store.state.car.carToPosition;
          this.car.index = carToPosition.index;
          this.car.id = carToPosition.id;
          this.car.lat = carToPosition.position.lat;
          this.car.lng = carToPosition.position.lng;
        }
      }
    }
  }
</script>

<style scoped>

</style>
