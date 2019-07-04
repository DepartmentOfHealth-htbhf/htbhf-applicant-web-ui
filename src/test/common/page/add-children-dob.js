'use strict'

const SubmittablePage = require('./submittable-page')

const { dateLastYear } = require('../../common/dates')

const PAGE_TITLES = {
  en: 'GOV.UK - Add your children’s dates of birth',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for AddChildrenDOB page where the claimant can enter their children's dates of birth.
 */
class AddChildrenDOB extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.childIndex = 1
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/children-dob'
  }

  getPageName () {
    return 'add your childrens dates of birth'
  }

  async clickAddAnotherChild () {
    const addAnotherChildButton = await this.findById('add-another-child')
    await addAnotherChildButton.click()
  }

  async enterChildUnder3DetailsWithoutAName () {
    await this.enterChildUnder3DateOfBirth()
    this.childIndex++
  }

  async enterChildUnder3Details () {
    await this.enterChildName()
    await this.enterChildUnder3DateOfBirth()
    this.childIndex++
  }

  async enterChildUnder3DateOfBirth () {
    const dateOfBirth = dateLastYear()
    await this.enterDay(dateOfBirth.getDate())
    await this.enterMonth(dateOfBirth.getMonth() + 1)
    await this.enterYear(dateOfBirth.getFullYear())
  }

  async getNameField () {
    return this.findById(`child-name-${this.childIndex}`)
  }

  async getDayField () {
    return this.findById(`childDob-${this.childIndex}-day`)
  }

  async getMonthField () {
    return this.findById(`childDob-${this.childIndex}-month`)
  }

  async getYearField () {
    return this.findById(`childDob-${this.childIndex}-year`)
  }

  async enterChildName () {
    const dayField = await this.getNameField()
    return dayField.sendKeys(`Child${this.childIndex}`)
  }

  async enterDay (day) {
    const dayField = await this.getDayField()
    return dayField.sendKeys(day)
  }

  async enterMonth (month) {
    const monthField = await this.getMonthField()
    return monthField.sendKeys(month)
  }

  async enterYear (year) {
    const yearField = await this.getYearField()
    return yearField.sendKeys(year)
  }
}

module.exports = AddChildrenDOB
