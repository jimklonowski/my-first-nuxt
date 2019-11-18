<template>
  <!-- <v-col :cols="12" :md="showMore ? 12 : 6"> -->
  <!-- <v-col :cols="showMore ? 'auto' : 12"> -->
  <v-col cols="auto">
    <v-card min-width="400" shaped>
      <v-card-subtitle>Accidents</v-card-subtitle>
      <v-card-title class="display-2 success--text" v-text="0" />
      <v-card-text class="font-italic font-weight-light">
        nice!
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="showMore = !showMore" icon>
          <v-icon>{{ showMore ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <v-card :loading="loading" v-show="showMore" flat>
          <v-card-text>
            <v-data-table style="min-width:650px;" :headers="headers" :items="items" />
          </v-card-text>
          <v-card-actions>
            <v-btn v-text="'omg'" text />
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'AccidentCard',
  data: () => ({
    headers: [
      {
        text: 'Date',
        align: 'left',
        sortable: false,
        value: 'date'
      },
      { text: 'Service Location', value: 'location' },
      { text: 'Maintenance Details', value: 'details' },
      { text: 'In Network?', value: 'network' },
      { text: 'Amount', value: 'amount' }
    ],
    items: [
      { date: '2019-01-01', location: 'Klonowski AUTO', details: 'Tires', network: 'false', amount: '$43.51' }
    ],
    loading: false,
    showMore: false
  })
  // async created () {
  //   try {
  //     const data = await this.$axios.get('/maintenance')
  //     this.items = data
  //   } catch (err) {
  //     debugger
  //     console.log(err)
  //   }
  // }
}
</script>

<style>

</style>
