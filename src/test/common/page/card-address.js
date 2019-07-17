'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your address?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

const POSTCODE_ERROR_ID = 'postcode-error'
const ADDRESS_LINE_1_ERROR_ID = 'address-line-1-error'
const ADDRESS_LINE_2_ERROR_ID = 'address-line-2-error'
const TOWN_OR_CITY_ERROR_ID = 'town-or-city-error'
const ADDRESS_LINE_1_ERROR_LINK_CSS = 'a[href="#address-line-1-error"]'
const ADDRESS_LINE_2_ERROR_LINK_CSS = 'a[href="#address-line-2-error"]'
const TOWN_OR_CITY_ERROR_LINK_CSS = 'a[href="#town-or-city-error"]'
const POSTCODE_ERROR_LINK_CSS = 'a[href="#postcode-error"]'

/**
 * Page object for Address page where the address is entered.
 */
// TODO DW HTBHF-1845 rename file (not doing in current pr as rename and content change will appear as new file)
class Address extends SubmittablePage {
  getPath () {
    return '/address'
  }

  getPageName () {
    return 'address'
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
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

  getPostcodeFieldErrorId () {
    return POSTCODE_ERROR_ID
  }

  getAddressLine1FieldErrorId () {
    return ADDRESS_LINE_1_ERROR_ID
  }

  getAddressLine2FieldErrorId () {
    return ADDRESS_LINE_2_ERROR_ID
  }

  getTownOrCityFieldErrorId () {
    return TOWN_OR_CITY_ERROR_ID
  }

  getAddressLine1ErrorLinkCss () {
    return ADDRESS_LINE_1_ERROR_LINK_CSS
  }

  getAddressLine2ErrorLinkCss () {
    return ADDRESS_LINE_2_ERROR_LINK_CSS
  }

  getTownOrCityErrorLinkCss () {
    return TOWN_OR_CITY_ERROR_LINK_CSS
  }

  getPostcodeErrorLinkCss () {
    return POSTCODE_ERROR_LINK_CSS
  }
}

module.exports = Address
