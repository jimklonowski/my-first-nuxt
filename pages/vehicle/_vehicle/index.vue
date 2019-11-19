<template>
  <v-container>
    <v-row>
      <vehicle-card />
      <driver-card />
      <accident-card />
      <fuel-card />
      <maintenance-card />
      <invoice-card />
      <toll-card />
      <violation-card />
    </v-row>
  </v-container>
</template>

<script>
import AccidentCard from '@/components/vehicle/AccidentCard'
import DriverCard from '@/components/vehicle/DriverCard'
import FuelCard from '@/components/vehicle/FuelCard'
import InvoiceCard from '@/components/vehicle/InvoiceCard'
import MaintenanceCard from '@/components/vehicle/MaintenanceCard'
import TollCard from '@/components/vehicle/TollCard'
import ViolationCard from '@/components/vehicle/ViolationCard'
import VehicleCard from '@/components/vehicle/VehicleCard'

export default {
  name: 'VehicleDashboard',
  components: {
    AccidentCard,
    DriverCard,
    FuelCard,
    InvoiceCard,
    MaintenanceCard,
    TollCard,
    VehicleCard,
    ViolationCard
  },
  middleware: ['auth'],
  /**
   * If validator doesn't return true (or a promise reolving to true), or throws an error, nuxt will load the 404 or 500 error pages
   * https://nuxtjs.org/guide/routing/#validate-route-params
   */
  validate ({ params }) {
    // To test, vehicle param must be a number
    return /^[a-z0-9]+$/i.test(params.vehicle)
  }
}
</script>

<style>

</style>
