<template>
  <v-col :cols="12" :md="showMore ? 12 : 6" :lg="showMore ? 6 : 4">
    <v-card shaped>
      <v-card-subtitle>Vehicle Number {{ $route.params.vehicle }}</v-card-subtitle>
      <v-card-title>Vehicle Dashboard for {{ $route.params.vehicle }}</v-card-title>
      <v-card-text>WOWZORS</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text>
          Edit Vehicle Info
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    showMore: false
  })
}
</script>

<style>

</style>
