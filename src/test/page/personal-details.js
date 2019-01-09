'use strict'

const Page = require('./page')
const { expect } = require('chai')

/**
 * Page object for PersonalDetails page where the name is entered.
 * This will change greatly when the Name page is revisited for HTBHFB-7.
 */
class PersonalDetails extends Page {
  async getFirstNameField () {
    return this.findById('firstName')
  }

  async getLastNameField () {
    return this.findById('lastName')
  }

  async getSubmitButton () {
    return this.findByClassName('govuk-button')
  }

  async enterFirstName (name) {
    const nameField = await this.getFirstNameField()
    return nameField.sendKeys(name)
  }

  async enterLastName (name) {
    const nameField = await this.getLastNameField()
    return nameField.sendKeys(name)
  }

  async submitForm () {
    const submitButton = await this.getSubmitButton()
    await submitButton.click()
  }

  async isConfirmationDisplayed () {
    const confirm = await this.findByCSS('[value="Confirm submission"]')
    return confirm.isDisplayed()
  }

  async open (baseURL) {
    await super.open(`${baseURL}/personal-details`)
    return this.waitForPageLoad()
  }

  async waitForPageLoad () {
    const h1Text = await this.getH1Text()
    expect(h1Text).to.be.equal('Personal details')
  }
}

module.exports = PersonalDetails
