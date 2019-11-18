<template>
  <v-container>
    <v-row>
      <vehicle-card />
      <driver-card />
      <accident-card />
      <fuel-card />
      <maintenance-card />
    </v-row>
  </v-container>
</template>

<script>
import AccidentCard from '@/components/vehicle/AccidentCard'
import DriverCard from '@/components/vehicle/DriverCard'
import FuelCard from '@/components/vehicle/FuelCard'
import MaintenanceCard from '@/components/vehicle/MaintenanceCard'
import VehicleCard from '@/components/vehicle/VehicleCard'

export default {
  components: {
    AccidentCard,
    DriverCard,
    FuelCard,
    MaintenanceCard,
    VehicleCard
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
