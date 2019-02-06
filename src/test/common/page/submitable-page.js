const Page = require('./page')

class SubmitablePage extends Page {
  async getSubmitButton () {
    return this.findByClassName('govuk-button')
  }

  async submitForm () {
    const submitButton = await this.getSubmitButton()
    await submitButton.click()
  }

  async getSubmitButtonText () {
    const submitButton = await this.getSubmitButton()
    return submitButton.getText()
  }
}

module.exports = SubmitablePage
