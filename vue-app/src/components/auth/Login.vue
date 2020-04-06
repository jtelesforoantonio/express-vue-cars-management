<template>
  <v-card width="400" class="mx-auto mt-12" shaped :loading="loading">
    <v-card-title>Login</v-card-title>
    <ValidationObserver v-slot="{ invalid, handleSubmit }" ref="form">
      <v-card-text>
        <form @submit.prevent="handleSubmit(login)" @keyup.enter="handleSubmit(login)">
          <errors v-show="errors.length" :errors="errors"/>
          <ValidationProvider name="correo" rules="required|email" v-slot="{ errors }">
            <v-text-field
              type="email"
              label="Correo"
              outlined
              required
              autofocus
              v-model="email"
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider name="contraseña" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Contraseña"
              outlined
              required
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :error-messages="errors"
              v-model="password"
              @click:append="showPassword = !showPassword"
            />
          </ValidationProvider>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="info" @click="handleSubmit(login)">Iniciar</v-btn>
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
  import {mapState} from 'vuex';
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import Errors from '../common/Errors';
  import validate from '../../utils/validations/auth/login';

  validate();

  export default {
    name: 'Login',
    components: {
      ValidationObserver,
      ValidationProvider,
      Errors
    },
    data() {
      return {
        email: '',
        password: '',
        showPassword: false
      }
    },
    methods: {
      login() {
        let credentials = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('auth/login', credentials);
      }
    },
    computed: {
      ...mapState('auth', ['loading', 'errors'])
    }
  }
</script>

<style scoped>
</style>
