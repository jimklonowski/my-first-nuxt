<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
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
        <v-list-item @click="$auth.logout()">
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
      <!-- <v-btn
        @click.stop="rightDrawer = !rightDrawer"
        icon
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
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
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Vehicle Dashboard',
          key: 'navigation.vehicle_dashboard',
          to: '/vehicle'
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
  }
}
</script>
