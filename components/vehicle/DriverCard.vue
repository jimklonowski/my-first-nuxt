<template>
  <v-col :cols="12" :md="showMore ? 12 : 6" :lg="showMore ? 6 : 4">
    <v-card shaped>
      <v-card-subtitle>Driver Number {{ $route.params.vehicle }}</v-card-subtitle>
      <v-card-title>Jim Klonowski</v-card-title>
      <v-card-text>contact info</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text>
          Edit Driver(s)
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
