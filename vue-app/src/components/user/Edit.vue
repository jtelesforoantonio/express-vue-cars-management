<template>
  <v-row justify="center">
    <v-dialog persistent max-width="600px" v-model="showEditDialog">
      <v-card>
        <v-card-title>
          <span class="headline">Editar usuario</span>
        </v-card-title>
        <ValidationObserver v-slot="{ invalid, handleSubmit }" ref="form">
          <v-card-text>
            <v-container>
              <errors v-show="errors.length" :errors="errors"/>
              <ValidationProvider name="nombre" rules="required|alpha_spaces" v-slot="{ errors }">
                <v-text-field
                  label="Nombre *"
                  outlined
                  required
                  autofocus
                  v-model="user.name"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider name="correo" rules="required|email" v-slot="{ errors }">
                <v-text-field
                  type="email"
                  label="Correo *"
                  outlined
                  required
                  v-model="user.email"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
              <v-text-field
                type="password"
                label="Contraseña *"
                outlined
                v-model="user.password">
              </v-text-field>
              <v-switch label="Administrador" v-model="user.isAdmin"></v-switch>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="green" text @click="handleSubmit(update)" :loading="isUpdating">Guardar</v-btn>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import {mapState} from 'vuex';
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import Errors from "../common/Errors";
  import validate from "../../utils/validations/user/edit";

  validate();

  export default {
    name: 'Edit',
    components: {
      ValidationObserver,
      ValidationProvider,
      Errors
    },
    data() {
      return {
        user: {
          index: '',
          id: '',
          name: '',
          email: '',
          password: '',
          isAdmin: false,
        }
      }
    },
    methods: {
      clearForm() {
        this.$refs.form.reset();
        this.user.name = '';
        this.user.email = '';
        this.user.password = '';
        this.user.isAdmin = false;
      },
      closeDialog() {
        this.clearForm();
        this.$store.dispatch('user/showEditDialog', false);
      },
      update() {
        this.$store.dispatch('user/update', this.user);
      }
    },
    computed: {
      ...mapState('user', ['showEditDialog', 'isUpdating', 'errors'])
    },
    watch: {
      showEditDialog(val) {
        if (!val) {
          this.clearForm();
        } else {
          const userToEdit = this.$store.state.user.userToEdit;
          Object.assign(this.user, userToEdit);
        }
      }
    }
  }
</script>

<style scoped>

</style>
