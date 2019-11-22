
/**
 * Click-to-Dial a phone number
 */
export const dialTo = (number) => { window.location = `tel:${number}` }

/**
 * Click-to-Compose an email
 */
export const emailTo = (email) => { window.location = `mailto:${email}` }

/**
 * Convert v-data-table headers object to {k1:v1,k2:v2,...} format required by vue-json-excel
 * @param {Object[]} headers - An array of headers to be exported as columns.
 */
export const headersForExport = (headers) => {
  debugger
  // create array of {key:value} pairs objects for exporting as columns and use i18n translations
  const headerColumns = headers.map(header => ({
    [this.app.i18n.t(header.key)]: header.value
  }))
  // return a single object with all exported columns as fields
  return Object.assign({}, ...headerColumns)
}
