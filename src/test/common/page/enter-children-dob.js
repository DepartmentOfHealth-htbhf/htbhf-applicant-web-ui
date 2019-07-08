'use strict'

const SubmittablePage = require('./submittable-page')

const { dateLastYear } = require('../../common/dates')

const PAGE_TITLES = {
  en: 'GOV.UK - Enter your children’s dates of birth',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for the enter children's dates of birth page.
 */
class EnterChildrenDOB extends SubmittablePage {
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
    return 'enter your childrens dates of birth'
  }

  async clickAddAnotherChild () {
    const addAnotherChildButton = await this.findById('add-another-child')
    await addAnotherChildButton.click()
  }

  async enterChild3OrUnderDetails (name = `Child${this.childIndex}`, dayIncrement = 0) {
    await this.enterChildName(name)
    await this.enterChild3OrUnderDateOfBirth(dayIncrement)
    this.childIndex++
  }
  async enterChild3OrUnderDateOfBirth (dayIncrement = 0) {
    const dateOfBirth = dateLastYear(dayIncrement)
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

  async enterChildName (name) {
    const dayField = await this.getNameField()
    return dayField.sendKeys(name)
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

  getChildDateOfBirthFieldErrorId (index) {
    return `child-dob-${index}-error`
  }

  getChildDateOfBirthErrorLinkCss (index) {
    return `a[href="#child-dob-${index}-error"]`
  }

  getChildNameFieldErrorId (index) {
    return `child-name-${index}-error`
  }

  getChildNameErrorLinkCss (index) {
    return `a[href="#child-name-${index}-error"]`
  }
}

module.exports = EnterChildrenDOB
