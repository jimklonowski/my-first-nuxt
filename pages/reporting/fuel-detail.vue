<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Fuel Detail Report
            <v-spacer />
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              :label="$t('common.search')"
              clearable
              single-line
              hide-details
            />
          </v-card-title>
          <v-card-text>
            <v-skeleton-loader :loading="initializing" type="table">
              <v-data-table
                :loading="loading"
                :headers="getHeaders"
                :items="items"
                :search="search"
                class="striped"
              >
                <!-- BELOW ARE OVERRIDES FOR THE DEFAULT V-DATA-TABLE SLOTS https://vuetifyjs.com/en/components/data-tables#api -->
                <!-- TOP: Date filters -->
                <template #top>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-menu
                          ref="start_menu"
                          v-model="start_menu"
                          :close-on-content-click="false"
                          :return-value.sync="start"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              v-model="start"
                              :label="$t('date.start_date')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="start"
                            type="month"
                            no-title
                            scrollable
                          >
                            <v-spacer />
                            <v-btn text @click="start_menu = false">
                              {{ $t('common.cancel') }}
                            </v-btn>
                            <v-btn text @click="$refs.start_menu.save(start), updateFilters()">
                              {{ $t('common.ok') }}
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-menu
                          ref="end_menu"
                          v-model="end_menu"
                          :close-on-content-click="false"
                          :return-value.sync="end"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              v-model="end"
                              :label="$t('date.end_date')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="end"
                            type="month"
                            no-title
                            scrollable
                          >
                            <v-spacer />
                            <v-btn text @click="end_menu = false">
                              {{ $t('common.cancel') }}
                            </v-btn>
                            <v-btn text @click="$refs.end_menu.save(end), updateFilters()">
                              {{ $t('common.ok') }}
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="use_bill_date"
                          :label="'Use Bill Date'"
                          :false-value="'N'"
                          :true-value="'Y'"
                          hint="Not Yet Implemented..."
                          messages="Not Yet Implemented..."
                          @change="updateFilters()"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </template>

                <!-- Datatable loading indicator -->
                <template #progress>
                  <v-progress-linear color="primary" height="5" indeterminate />
                </template>

                <!-- No Data (from server) -->
                <template #no-data>
                  <div class="text-left">
                    No data was returned.
                  </div>
                </template>

                <!-- No Results (search) -->
                <template #no-results>
                  <div class="text-left">
                    {{ $t('common.no_search_results', { 'query': search }) }}
                  </div>
                </template>

                <!-- format 'amount' as currency -->
                <template #item.amount="{ item }">
                  {{ item.amount | currency }}
                </template>

                <!-- format 'bill_date' as locale date -->
                <template #item.bill_date="{ item }">
                  {{ item.bill_date | date }}
                </template>

                <!-- format 'card_number' as a chip -->
                <template #item.card_number="{ item }">
                  <v-chip :outlined="$vuetify.theme.dark" small v-text="item.card_number" />
                </template>

                <!-- format vehicle_number as a vehicle-dashboard link -->
                <template #item.vehicle_number="{ item }">
                  <v-btn small :title="$t(`${i18nNamespace}.to_vehicle_dashboard`)" :to="localePath({ path: `/vehicle/${item.vehicle_number}` })" v-text="item.vehicle_number" />
                </template>
              </v-data-table>
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FuelDetail',
  data: vm => ({
    i18nNamespace: 'reports.fuel_detail',
    error: null,
    initializing: true,
    loading: false,
    // start: vm.$moment().format('L'),
    start: vm.$moment().startOf('month').format('YYYY-MM'),
    start_menu: false,
    // end: vm.$moment().format('L'),
    end: vm.$moment().endOf('month').format('YYYY-MM'),
    end_menu: false,
    use_bill_date: false,
    search: '',
    items: []
  }),
  // parent view is authed, so unnecessary
  // middleware: ['auth'],
  computed: {
    columns () {
      // this list may change between canada/us, so generate it in a COMPUTED method
      return [
        'amount',
        'bill_date',
        'bill_sort',
        'card_number',
        'center_code',
        'center_name',
        'client_use_1',
        'client_use_2',
        'client_use_3',
        'client_use_4',
        'client_use_5',
        'client_vehicle_number',
        'driver_id',
        'driver_name',
        'emkay_invoice_date',
        'emkay_invoice_number',
        'engine_fuel_type',
        'exception',
        'fuel_card_vendor',
        'fuel_company_name',
        'fuel_company_number',
        'invoice_number',
        'level_01',
        'level_02',
        'level_03',
        'merchant_address',
        'merchant_city',
        'merchant_state',
        'merchant_zip',
        'model_year',
        'odometer',
        'premium',
        'product',
        'product_type',
        'quantity',
        'service_date',
        'service_time',
        'tank_capacity',
        'tax_exempt',
        'unit_price',
        'vehicle_make',
        'vehicle_model',
        'vehicle_number',
        'vin',
        'voucher'
      ]
    },
    /**
     * Convert a string list of columns to a list of TableHeader[]
     */
    getHeaders () {
      // {
      //   text: string
      //   value: string
      //   align?: 'start' | 'center' | 'end'
      //   sortable?: boolean
      //   filterable?: boolean
      //   divider?: boolean
      //   class?: string | string[]
      //   width?: string | number
      //   filter?: (value: any, search: string, item: any) => boolean
      //   sort?: (a: any, b: any) => number
      // }
      let headers = []
      // for each column header, create a TableHeader with translated text and class 'report-column'
      headers = this.columns.map((column) => {
        return {
          text: this.$t(`${this.i18nNamespace}.${column}`),
          value: column,
          class: 'report-column'
        }
      })
      return headers
    },
    headers2 () {
      return [
        // {
        //   text: string
        //   value: string
        //   align?: 'start' | 'center' | 'end'
        //   sortable?: boolean
        //   filterable?: boolean
        //   divider?: boolean
        //   class?: string | string[]
        //   width?: string | number
        //   filter?: (value: any, search: string, item: any) => boolean
        //   sort?: (a: any, b: any) => number
        // },
        {
          text: this.$t(`${this.i18nNamespace}.amount`),
          value: 'amount',
          align: 'start',
          width: 120
        },
        {
          text: this.$t(`${this.i18nNamespace}.bill_date`),
          value: 'bill_date',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.bill_sort`),
          value: 'bill_sort',
          align: 'start',
          width: 180
        },
        {
          text: this.$t(`${this.i18nNamespace}.card_number`),
          value: 'card_number',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.center_code`),
          value: 'center_code',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.center_name`),
          value: 'center_name',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_1`),
          value: 'client_use_1',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_2`),
          value: 'client_use_2',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_3`),
          value: 'client_use_3',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_4`),
          value: 'client_use_4',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_use_5`),
          value: 'client_use_5',
          align: 'start',
          width: 165
        },
        {
          text: this.$t(`${this.i18nNamespace}.client_vehicle_number`),
          value: 'client_vehicle_number',
          align: 'start',
          width: 210
        },
        {
          text: this.$t(`${this.i18nNamespace}.driver_id`),
          value: 'driver_id',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.driver_name`),
          value: 'driver_name',
          align: 'start',
          width: 175
        },
        {
          text: this.$t(`${this.i18nNamespace}.emkay_invoice_date`),
          value: 'emkay_invoice_date',
          align: 'start',
          width: 200
        },
        {
          text: this.$t(`${this.i18nNamespace}.emkay_invoice_number`),
          value: 'emkay_invoice_number',
          align: 'start',
          width: 200
        },
        {
          text: this.$t(`${this.i18nNamespace}.engine_fuel_type`),
          value: 'engine_fuel_type',
          align: 'start',
          width: 210
        },
        {
          text: this.$t(`${this.i18nNamespace}.exception`),
          value: 'exception',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.fuel_card_vendor`),
          value: 'fuel_card_vendor',
          align: 'start',
          width: 220
        },
        {
          text: this.$t(`${this.i18nNamespace}.fuel_company_name`),
          value: 'fuel_company_name',
          align: 'start',
          width: 240
        },
        {
          text: this.$t(`${this.i18nNamespace}.fuel_company_number`),
          value: 'fuel_company_number',
          align: 'start',
          width: 260
        },
        {
          text: this.$t(`${this.i18nNamespace}.invoice_number`),
          value: 'invoice_number',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.level_01`),
          value: 'level_01',
          align: 'start',
          width: 120
        },
        {
          text: this.$t(`${this.i18nNamespace}.level_02`),
          value: 'level_02',
          align: 'start',
          width: 120
        },
        {
          text: this.$t(`${this.i18nNamespace}.level_03`),
          value: 'level_03',
          align: 'start',
          width: 120
        },
        {
          text: this.$t(`${this.i18nNamespace}.merchant_address`),
          value: 'merchant_address',
          align: 'start',
          width: 200
        },
        {
          text: this.$t(`${this.i18nNamespace}.merchant_city`),
          value: 'merchant_city',
          align: 'start',
          width: 180
        },
        {
          text: this.$t(`${this.i18nNamespace}.merchant_state`),
          value: 'merchant_state',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.merchant_zip`),
          value: 'merchant_zip',
          align: 'start',
          width: 180
        },
        {
          text: this.$t(`${this.i18nNamespace}.model_year`),
          value: 'model_year',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.odometer`),
          value: 'odometer',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.premium`),
          value: 'premium',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.product`),
          value: 'product',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.product_type`),
          value: 'product_type',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.quantity`),
          value: 'quantity',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.service_date`),
          value: 'service_date',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.service_time`),
          value: 'service_time',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.tank_capacity`),
          value: 'tank_capacity',
          align: 'start',
          width: 170
        },
        {
          text: this.$t(`${this.i18nNamespace}.tax_exempt`),
          value: 'tax_exempt',
          align: 'start',
          width: 150
        },
        {
          text: this.$t(`${this.i18nNamespace}.unit_price`),
          value: 'unit_price',
          align: 'start',
          width: 140
        },
        {
          text: this.$t(`${this.i18nNamespace}.vehicle_make`),
          value: 'vehicle_make',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.vehicle_model`),
          value: 'vehicle_model',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.vehicle_number`),
          value: 'vehicle_number',
          align: 'start',
          width: 160
        },
        {
          text: this.$t(`${this.i18nNamespace}.vin`),
          value: 'vin',
          align: 'start',
          width: 200
        },
        {
          text: this.$t(`${this.i18nNamespace}.voucher`),
          value: 'voucher',
          align: 'start',
          width: 150
        }
      ]
    }
  },
  // https://nuxtjs.org/api/pages-watchquery/
  watchQuery (newQuery, oldQuery) {
    // re-fetch data when query changes
    this.getReport()
  },
  async created () {
    // cancel an existing query
    if (this.$route.query) {
      if (this.$route.query.start) { this.start = this.$route.query.start }
      if (this.$route.query.end) { this.end = this.$route.query.end }
      if (this.$route.query.bill_date) { this.use_bill_date = this.$route.query.bill_date }
    }
    await this.getReport()
    this.initializing = false
  },
  methods: {
    updateFilters () {
      // this.$router.push({ query: { start: this.start, end: this.end, use_bill_date: false } })
      // add the query filters to the current url, triggering the watchQuery handler
      this.$router.push({ query: { start: this.start, end: this.end } })
    },
    async getReport () {
      this.loading = true
      this.items = []
      try {
        const filters = { start_date: this.start, end_date: this.end }

        // if (this.use_bill_date) {
        //   debugger
        //   filters = { ...filters, ...{ bill_date: this.use_bill_date }}
        // }

        const response = await this.$axios.post(`${process.env.EMKAY_API}/rest-test/fuel-detail`, filters)
        this.items = response.data.data
        this.loading = false
      } catch (e) {
        debugger
        throw new Error(e)
      }
    }
  }
}
</script>
