'use strict';

const { APP_NAME } = require('../config');
const Page = require('./page');
const PERSONAL_DETAILS_PAGE_TITLE = 'Personal details – GOV.UK';
const { expect } = require('chai');

/**
 * Page object for PersonalDetails page where the name is entered.
 * This will change greatly when the Name page is revisited for HTBHFB-7.
 */
class PersonalDetails extends Page {
  constructor(driver) {
    super(driver);
  }

  async getFirstNameField() {
    return await this.findById('first-name');
  }

  async getLastNameField() {
    return await this.findById('second-name');
  }

  async getSubmitButton() {
    return await this.findByClassName('govuk-button');
  }

  async enterFirstName(name) {
    const nameField = await this.getFirstNameField();
    return await nameField.sendKeys(name);
  }

  async enterLastName(name) {
    const nameField = await this.getLastNameField();
    return await nameField.sendKeys(name);
  }

  async submitForm() {
    const submitButton = await this.getSubmitButton();
    await submitButton.click();
  }

  async isConfirmationDisplayed() {
    const confirm = await this.findByCSS('[value="Confirm submission"]');
    return await confirm.isDisplayed();
  }

  async open(baseURL) {
    await super.open(`${baseURL}/personal-details`);
    return await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    const h1Text = await this.getH1Text();
    expect(h1Text).to.be.equal('Personal details');
  }
}

module.exports = PersonalDetails;
