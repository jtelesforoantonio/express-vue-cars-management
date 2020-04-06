<template>
  <v-row justify="center">
    <v-dialog persistent max-width="600px" v-model="showCreateDialog">
      <v-card>
        <v-card-title>
          <span class="headline">Crear vehículo</span>
        </v-card-title>
        <ValidationObserver v-slot="{ handleSubmit }" ref="form">
          <v-card-text>
            <v-container>
              <errors v-show="errors.length" :errors="errors"/>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider name="placas" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Placas *"
                      outlined
                      required
                      autofocus
                      v-model="car.plate"
                      :error-messages="errors"></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider name="marca" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Marca *"
                      outlined
                      requried
                      :error-messages="errors"
                      v-model="car.brand">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider name="color" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Color *"
                      outlined
                      required
                      :error-messages="errors"
                      v-model="car.color">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider name="modelo" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Modelo *"
                      outlined
                      required
                      :error-messages="errors"
                      v-model="car.model">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider name="latitud" rules="required" v-slot="{ errors }">
                    <v-text-field
                      type="number"
                      label="Latitud *"
                      outlined
                      requried
                      :error-messages="errors"
                      v-model="car.position.lat">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider name="longitud" rules="required" v-slot="{ errors }">
                    <v-text-field
                      type="number"
                      label="Longitud *"
                      outlined
                      required
                      :error-messages="errors"
                      v-model="car.position.lng">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="green" text @click="handleSubmit(store)" :loading="isStoring">Guardar</v-btn>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import {mapState} from 'vuex';
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import Errors from '../common/Errors';
  import validate from '../../utils/validations/car/create';

  validate();

  export default {
    name: 'Create',
    components: {
      ValidationObserver,
      ValidationProvider,
      Errors
    },
    data() {
      return {
        car: {
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
      clearForm() {
        this.$refs.form.reset();
        this.car.plate = '';
        this.car.brand = '';
        this.car.color = '';
        this.car.model = '';
        this.car.position.lat = '';
        this.car.position.lng = '';
      },
      closeDialog() {
        this.$store.dispatch('car/showCreateDialog', false);
      },
      store() {
        this.car.position.lat = parseFloat(this.car.position.lat);
        this.car.position.lng = parseFloat(this.car.position.lng);
        this.$store.dispatch('car/store', this.car);
      }
    },
    computed: {
      ...mapState('car', ['showCreateDialog', 'isStoring', 'errors'])
    },
    watch: {
      showCreateDialog(val) {
        if (!val) {
          this.clearForm();
        }
      }
    }
  }
</script>

<style scoped>

</style>
