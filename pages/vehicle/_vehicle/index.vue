<template>
  <v-container>
    <no-ssr>
      <v-row v-masonry transition-duration="300ms" item-selector=".dashboard-item" class="masonry-container">
        <vehicle-card v-masonry-tile class="dashboard-item" />
        <driver-card v-masonry-tile class="dashboard-item" />
        <accident-card v-masonry-tile class="dashboard-item" />
        <fuel-card v-masonry-tile class="dashboard-item" />
        <maintenance-card v-masonry-tile class="dashboard-item" />
        <invoice-card v-masonry-tile class="dashboard-item" />
        <toll-card v-masonry-tile class="dashboard-item" />
        <violation-card v-masonry-tile class="dashboard-item" />
      </v-row>
    </no-ssr>
  </v-container>
</template>

<script>
import NoSSR from 'vue-no-ssr'
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
    'no-ssr': NoSSR,
    AccidentCard,
    DriverCard,
    FuelCard,
    InvoiceCard,
    MaintenanceCard,
    TollCard,
    VehicleCard,
    ViolationCard
  },
  methods: {
    redraw () {
      this.$redrawVueMasonry()
    }
  },
  mounted () {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
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
