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
              append-icon="mdi-search"
              :label="$t('common.search')"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            :loading="loading"
            :headers="headers"
            :items="items"
            :search="search"
          >
            <template #loading>
              <v-skeleton-loader type="table-tbody" tile />
            </template>
            <template
              v-for="header in headers"
              [`#header.${header.value}`]="{ header }"
            >
              {{ $t(header.key) }}
            </template>
            <template #top>
              <v-toolbar prominent flat>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-menu
                        ref="start_menu"
                        v-model="start_menu"
                        :close-on-content-click="false"
                        :return-value.sync="start_date"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template #activator="{ on }">
                          <v-text-field
                            v-model="start_date"
                            :label="$t('date.start_date')"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="start_date"
                          type="month"
                          no-title
                          scrollable
                        >
                          <v-spacer />
                          <v-btn text color="primary" @click="start_menu = false">
                            {{ $t('common.cancel') }}
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.start_menu.save(start_date)">
                            {{ $t('common.ok') }}
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        ref="end_menu"
                        v-model="end_menu"
                        :close-on-content-click="false"
                        :return-value.sync="end_date"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template #activator="{ on }">
                          <v-text-field
                            v-model="end_date"
                            :label="$t('date.end_date')"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="end_date"
                          type="month"
                          no-title
                          scrollable
                        >
                          <v-spacer />
                          <v-btn text color="primary" @click="end_menu = false">
                            {{ $t('common.cancel') }}
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.end_menu.save(end_date)">
                            {{ $t('common.ok') }}
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FuelDetail',
  data: () => ({
    loading: false,
    start_date: '2019-10',
    start_menu: false,
    end_date: '2019-10',
    end_menu: false,
    search: '',
    headers: [
      { text: 'Amount', key: 'reports.fuel_detail.amount', align: 'start', width: '120', value: 'amount' },
      { text: 'Bill Date', key: 'reports.fuel_detail.bill_date', align: 'start', width: '120', value: 'bill_date' },
      // { text: 'Bill Month', key: 'reports.fuel_detail.bill_month', align: 'start', width: '120', value: 'bill_month' },
      // { text: 'Bill Year', key: 'reports.fuel_detail.bill_year', align: 'start', width: '120', value: 'bill_year' },
      { text: 'Billing Sort', key: 'reports.fuel_detail.bill_sort', align: 'start', width: '150', value: 'bill_sort' },
      { text: 'Card Number', key: 'reports.fuel_detail.card_number', align: 'start', width: '130', value: 'card_number' },
      { text: 'Center Code', key: 'reports.fuel_detail.center_code', align: 'start', width: '120', value: 'center_code' },
      { text: 'Center Name', key: 'reports.fuel_detail.center_name', align: 'start', width: '150', value: 'center_name' },
      { text: 'Client Use 1', key: 'reports.fuel_detail.client_use_1', align: 'start', width: '120', value: 'client_use_1' },
      { text: 'Client Use 2', key: 'reports.fuel_detail.client_use_2', align: 'start', width: '120', value: 'client_use_2' },
      { text: 'Client Use 3', key: 'reports.fuel_detail.client_use_3', align: 'start', width: '120', value: 'client_use_3' },
      { text: 'Client Use 4', key: 'reports.fuel_detail.client_use_4', align: 'start', width: '120', value: 'client_use_4' },
      { text: 'Client Use 5', key: 'reports.fuel_detail.client_use_5', align: 'start', width: '120', value: 'client_use_5' },
      { text: 'Client Vehicle Number', key: 'reports.fuel_detail.client_vehicle_number', align: 'start', width: '175', value: 'client_vehicle_number' },
      { text: 'Driver ID', key: 'reports.fuel_detail.driver_id', align: 'start', width: '120', value: 'driver_id' },
      { text: 'Driver Name', key: 'reports.fuel_detail.driver_name', align: 'start', width: '200', value: 'driver_name' },
      { text: 'EMKAY Invoice Date', key: 'reports.fuel_detail.emkay_invoice_date', align: 'start', width: '175', value: 'emkay_invoice_date' },
      { text: 'EMKAY Invoice Number', key: 'reports.fuel_detail.emkay_invoice_number', align: 'start', width: '200', value: 'emkay_invoice_number' },
      { text: 'Engine Fuel Type', key: 'reports.fuel_detail.engine_fuel_type', align: 'start', width: '150', value: 'engine_fuel_type' },
      { text: 'Exception', key: 'reports.fuel_detail.exception', align: 'start', width: '100', value: 'exception' },
      { text: 'Fuel Card Vendor', key: 'reports.fuel_detail.fuel_card_vendor', align: 'start', width: '120', value: 'fuel_card_vendor' },
      { text: 'Fuel Company Name', key: 'reports.fuel_detail.fuel_company_name', align: 'start', width: '175', value: 'fuel_company_name' },
      { text: 'Fuel Company Number', key: 'reports.fuel_detail.fuel_company_number', align: 'start', width: '180', value: 'fuel_company_number' },
      { text: 'Invoice Number', key: 'reports.fuel_detail.invoice_number', align: 'start', width: '150', value: 'invoice_number' },
      { text: 'Level 1', key: 'reports.fuel_detail.level_01', align: 'start', width: '150', value: 'level_01' },
      { text: 'Level 2', key: 'reports.fuel_detail.level_02', align: 'start', width: '150', value: 'level_02' },
      { text: 'Level 3', key: 'reports.fuel_detail.level_03', align: 'start', width: '150', value: 'level_03' },
      { text: 'Merchant Address', key: 'reports.fuel_detail.merchant_address', align: 'start', width: '250', value: 'merchant_address' },
      { text: 'Merchant City', key: 'reports.fuel_detail.merchant_city', align: 'start', width: '150', value: 'merchant_city' },
      { text: 'Merchant State', key: 'reports.fuel_detail.merchant_state', align: 'start', width: '140', value: 'merchant_state' },
      { text: 'Merchant ZIP', key: 'reports.fuel_detail.merchant_zip', align: 'start', width: '150', value: 'merchant_zip' },
      { text: 'Model Year', key: 'reports.fuel_detail.model_year', align: 'start', width: '120', value: 'model_year' },
      { text: 'Odometer', key: 'reports.fuel_detail.odometer', align: 'start', width: '120', value: 'odometer' },
      { text: 'Premium', key: 'reports.fuel_detail.premium', align: 'start', width: '120', value: 'premium' },
      { text: 'Product', key: 'reports.fuel_detail.product', align: 'start', width: '120', value: 'product' },
      { text: 'Product Type', key: 'reports.fuel_detail.product_type', align: 'start', width: '150', value: 'product_type' },
      { text: 'Quantity', key: 'reports.fuel_detail.quantity', align: 'start', width: '120', value: 'quantity' },
      { text: 'Service Date', key: 'reports.fuel_detail.service_date', align: 'start', width: '200', value: 'service_date' },
      { text: 'Service Time', key: 'reports.fuel_detail.service_time', align: 'start', width: '200', value: 'service_time' },
      // { text: 'Sysunit', key: 'reports.fuel_detail.sysunit', align: 'start', width: '120', value: 'sysunit' },
      { text: 'Tank Capacity', key: 'reports.fuel_detail.tank_capacity', align: 'start', width: '150', value: 'tank_capacity' },
      { text: 'Tax Exempt', key: 'reports.fuel_detail.tax_exempt', align: 'start', width: '120', value: 'tax_exempt' },
      // { text: 'Type', key: 'reports.fuel_detail.type', align: 'start', width: '120', value: 'type' },
      { text: 'Unit Price', key: 'reports.fuel_detail.unit_price', align: 'start', width: '120', value: 'unit_price' },
      { text: 'Vehicle Make', key: 'reports.fuel_detail.vehicle_make', align: 'start', width: '150', value: 'vehicle_make' },
      { text: 'Vehicle Model', key: 'reports.fuel_detail.vehicle_model', align: 'start', width: '200', value: 'vehicle_model' },
      { text: 'Vehicle Number', key: 'reports.fuel_detail.vehicle_number', align: 'start', width: '150', value: 'vehicle_number' },
      { text: 'VIN', key: 'reports.fuel_detail.vin', align: 'start', width: '100', value: 'vin' },
      { text: 'Voucher', key: 'reports.fuel_detail.voucher', align: 'start', width: '120', value: 'voucher' }
    ],
    items: []
  }),
  middleware: ['auth'],
  async created () {
    await this.getReportData()
  },
  methods: {
    async getReportData () {
      this.loading = true
      const url = `${process.env.EMKAY_API}/rest-test/fuel-detail`
      const res = await this.$axios.post(url, { start_date: this.start_date, end_date: this.end_date })
      this.items = res.data.data
      this.loading = false
    }
  }
}
</script>

<style>

</style>
