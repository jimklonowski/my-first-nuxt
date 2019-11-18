<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      v-if="$auth.loggedIn"
      clipped
      fixed
      disable-route-watcher
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t(item.key) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-if="$auth.loggedIn" #append>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon v-text="'mdi-logout'" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('auth.logout') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark" icon>
        <v-icon>{{ $vuetify.theme.dark ? 'mdi-brightness-7' : 'mdi-brightness-5' }}</v-icon>
      </v-btn>

      <language-picker />

      <v-avatar v-if="$auth.loggedIn" size="48" color="primary">
        <span class="white--text body-1">
          {{ $auth.user.username }}
        </span>
      </v-avatar>
    </v-app-bar>
    <v-content>
      <!-- main router view -->
      <nuxt />
    </v-content>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <emkay-footer />
  </v-app>
</template>

<script>
import EmkayFooter from '@/components/EmkayFooter'
import LanguagePicker from '@/components/LanguagePicker'
export default {
  components: {
    EmkayFooter,
    LanguagePicker
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          key: 'navigation.home',
          to: { name: 'index' }
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Vehicle Dashboard',
          key: 'navigation.vehicle_dashboard',
          to: { name: 'vehicle' }
        }
        // {
        //   icon: 'mdi-login',
        //   title: 'Login',
        //   key: 'auth.login',
        //   to: '/login'
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'EMKAY Nuxt.js'
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$auth.redirect('/')
    }
  }
}
</script>
