<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <!-- reports menu -->
      <v-navigation-drawer
        v-model="rightDrawer"
        right
        stateless
        clipped
        app
        permanent
        floating
      >
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon light>
                mdi-repeat
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>hi mom</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- main router view -->
      <nuxt />
    </v-content>

    <emkay-footer />
  </v-app>
</template>

<script>
import EmkayFooter from '@/components/EmkayFooter'
import EmkayNavigation from '@/components/EmkayNavigation'
export default {
  components: {
    EmkayFooter,
    EmkayNavigation
  },
  data: () => ({
    rightDrawer: true,
    right: true
  })
}
</script>
