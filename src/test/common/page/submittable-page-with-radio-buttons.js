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

  async getRadioButton (option) {
    return this.findByCSS(`input[value="${option}"]`)
  }

  async getRadioButtons () {
    return this.driver.findElements(webdriver.By.className('govuk-radios__item'))
  }

  async getAllRadioLabels (option) {
    try {
      return this.driver.findElements(webdriver.By.className('govuk-label govuk-radios__label'))
    } catch (error) {
      console.log(`Error getting radio button with option ${option}`)
      throw new Error(error)
    }
  }
}

module.exports = SubmittablePageWithRadioButtons
