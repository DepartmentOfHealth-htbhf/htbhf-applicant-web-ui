const webdriver = require('selenium-webdriver')
const SubmittablePage = require('./submittable-page')
const YES = 'yes'
const NO = 'no'

class SubmittablePageWithRadioButtons extends SubmittablePage {
  async selectYesRadioButton () {
    await this.selectRadioButton(YES)
  }

  async selectNoRadioButton () {
    await this.selectRadioButton(NO)
  }

  async selectRadioButton (option) {
    const radioButton = await this.getRadioButton(option)
    const div = await radioButton.findElement(webdriver.By.xpath('..'))
    const label = await div.findElement(webdriver.By.className('govuk-radios__label'))
    await label.click()
  }

  async getRadioButtonHint (option) {
    const radioButton = await this.getRadioButton(option)
    const div = await radioButton.findElement(webdriver.By.xpath('..'))
    return div.findElement(webdriver.By.className('govuk-radios__hint'))
  }

  async getRadioButton (option) {
    return this.findByCSS(`input[value="${option}"]`)
  }

  async getRadioButtons () {
    return this.driver.findElements(webdriver.By.className('govuk-radios__item'))
  }

  async getAllRadioLabels () {
    try {
      return this.driver.findElements(webdriver.By.className('govuk-label govuk-radios__label'))
    } catch (error) {
      console.log(`Error getting all radio button labels`)
      throw new Error(error)
    }
  }
}

module.exports = SubmittablePageWithRadioButtons
