/* eslint-disable no-console */
'use strict'

/**
 * Class to represent use of and access to an input field identified by the id provided on construction.
 */
class InputField {
  constructor (inputFieldId, page) {
    this.inputFieldId = inputFieldId
    this.page = page
  }

  async getValue () {
    const input = await this.getElement()
    return input.getAttribute('value')
  }

  async enterValue (value) {
    const input = await this.getElement()
    return input.sendKeys(value)
  }

  async clearValue () {
    const input = await this.getElement()
    return input.clear()
  }

  async getElement () {
    return this.page.findById(this.inputFieldId)
  }

  getInputErrorId () {
    return `${this.inputFieldId}-error`
  }

  getInputErrorLinkCss () {
    return `a[href="#${this.inputFieldId}-error"]`
  }
}

module.exports = InputField
