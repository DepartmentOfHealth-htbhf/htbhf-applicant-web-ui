'use strict'

const DataEntryPage = require('./data-entry-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your address?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

const PAGE_HEADINGS = {
  en: 'What is your address?',
  cy: 'Urna condimentum mattis?'
}

/**
 * Page object for CardAddress page where the card card-address is entered.
 */
class CardAddress extends DataEntryPage {
  async open (baseURL) {
    await super.open(`${baseURL}/card-address`)
    return this.waitForPageLoad()
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageLoad(PAGE_HEADINGS[lang], PAGE_TITLES[lang])
  }

  async getAddressLine1Field () {
    return this.findById('address-line-1')
  }

  async getAddressLine2Field () {
    return this.findById('address-line-2')
  }

  async getTownOrCityField () {
    return this.findById('town-or-city')
  }

  async getPostcodeField () {
    return this.findById('postcode')
  }

  async enterAddressLine1 (addressLine1) {
    const addressLine1Field = await this.getAddressLine1Field()
    return addressLine1Field.sendKeys(addressLine1)
  }

  async enterAddressLine2 (addressLine2) {
    const addressLine2Field = await this.getAddressLine2Field()
    return addressLine2Field.sendKeys(addressLine2)
  }

  async enterTownOrCity (townOrCity) {
    const townOrCityField = await this.getTownOrCityField()
    return townOrCityField.sendKeys(townOrCity)
  }

  async enterPostcode (postcode) {
    const postcodeField = await this.getPostcodeField()
    return postcodeField.sendKeys(postcode)
  }
}

module.exports = CardAddress
