<template>
  <v-container class="login-hero" fill-height>
    <v-row justify="center">
      <v-card :loading="loading" width="500" raised>
        <v-form ref="form" @submit.prevent="login">
          <v-card-title v-t="'auth.login'" />
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="account" :label="$t('auth.account')" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="username" :label="$t('auth.username')" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="password" :label="$t('auth.password')" type="password" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-checkbox v-model="remember" :label="$t('auth.remember_me')" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="flex-column">
            <v-btn
              v-t="'auth.login'"
              type="submit"
              :ripple="false"
              color="primary lighten-2"
              large
              depressed
              block
            />
            <v-btn
              v-t="'auth.forgot_password'"
              @click=""
              tabindex="-1"
              small
              text
              block
            />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  auth: 'guest',
  data: () => ({
    account: '',
    username: '',
    password: '',

    error: null,
    loading: false,
    remember: false
  }),
  methods: {
    async login () {
      // https://github.com/nuxt-community/auth-module/blob/feat/refresh/examples/demo/pages/login.vue
      // https://github.com/nuxt-community/auth-module/blob/feat/refresh/examples/api/auth.js
      this.loading = true
      // const loginLocale = this.$i18n.locale
      await this.$auth
        .loginWith('local', {
          data: {
            account: this.account,
            username: this.username,
            password: this.password
          }
        })
        .catch((e) => {
          // debugger
          this.error = e + ''
        })
        .finally((a) => {
          this.loading = false
          // debugger
        })
      // forward them to /{locale}/index.vue (i.e. /fr/)
      this.$router.push(this.localePath({ name: 'index' }))
    }
  }
}
</script>
<style>
.login-hero::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-image: url(~@/static/coveredcar.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  opacity: 0.5;
}
</style>
