<template>
  <section>
    <v-col v-if="!$route.params.vehicle">
      <!-- if we're just at /vehicle, show search box -->
      <v-form @submit.prevent="search">
        <v-card width="600">
          <v-card-title>Vehicle Dashboard Search?</v-card-title>
          <v-card-text>
            <v-text-field v-model="query" :label="$t('common.search')" outlined />
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
    <!-- If a vehicle is selected, show the nested /vehicle/_vehicle route -->
    <nuxt-child v-else />
  </section>
</template>

<script>
export default {
  name: 'Vehicle',
  data: () => ({
    query: ''
  }),
  methods: {
    search () {
      this.$router.push({ path: `/vehicle/${this.query}` })
    }
  }
}
</script>

<style>

</style>
