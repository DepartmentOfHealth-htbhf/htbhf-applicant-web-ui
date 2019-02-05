'use strict'

const DataEntryPage = require('./data-entry-page')
const OVERVIEW_PAGE_TITLE = 'GOV.UK - Check your answers before sending your application'
const GOV_TABLE_ROW_CLASSNAME = 'govuk-table__row'
const GOV_TABLE_HEADER_CLASSNAME = 'govuk-table__header'
const GOV_TABLE_CELL_CLASSNAME = 'govuk-table__cell'

/**
 * Page object for the confirmation page before submit.
 */
class Check extends DataEntryPage {
  async open (appURL) {
    await super.open(appURL)
    return this.waitForPageLoad()
  }

  async waitForPageLoad () {
    return this.waitForPageWithTitle(OVERVIEW_PAGE_TITLE)
  }

  async getCheckDetailsTableContents () {
    const tableRows = await this.findAllByClassName(GOV_TABLE_ROW_CLASSNAME)

    const values = await Promise.all(tableRows)
    return this.getCheckTableContents(values)
  }

  async getCheckTableContents (tableRows) {
    const getDataForRows = tableRows.map(async (tableRow) => this.getDataForRow(tableRow))
    return Promise.all(getDataForRows)
  }

  async getDataForRow (tableRow) {
    try {
      const header = await this.findByClassName(GOV_TABLE_HEADER_CLASSNAME, tableRow)
      const headerText = await header.getText()
      const cell = await this.findByClassName(GOV_TABLE_CELL_CLASSNAME, tableRow)
      const cellText = await cell.getText()

      return { header: headerText, value: cellText }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getSendApplicationHelperText () {
    try {
      const sendApplicationTextParagraph = await this.findByClassName('govuk-body')
      return sendApplicationTextParagraph.getText()
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = Check
