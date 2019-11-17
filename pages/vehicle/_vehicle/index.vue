<template>
  <v-row no-gutters>
    <v-col cols="12" lg="6">
      <vehicle-information-card />
    </v-col>
    <v-col cols="12" lg="6">
      
    </v-col>
  </v-row>
</template>

<script>
import VehicleInformationCard from '@/components/vehicle/VehicleInformationCard'
export default {
  components: {
    VehicleInformationCard
  },
  middleware: ['auth'],
  /**
   * If validator doesn't return true (or a promise reolving to true), or throws an error, nuxt will load the 404 or 500 error pages
   * https://nuxtjs.org/guide/routing/#validate-route-params
   */
  validate ({ params }) {
    // To test, vehicle param must be a number
    return /^\d+$/.test(params.vehicle)
  }
}
</script>

<style>

</style>
