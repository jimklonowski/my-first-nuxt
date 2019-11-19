<template>
  <v-app>
    <emkay-navigation />

    <v-content>
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
  data () {
    return {}
  }
}
</script>
