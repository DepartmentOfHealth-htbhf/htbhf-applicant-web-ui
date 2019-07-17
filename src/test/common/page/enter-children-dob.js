'use strict'

const SubmittablePage = require('./submittable-page')

const { dateLastYear } = require('../../common/dates')

const PAGE_TITLES = {
  en: 'GOV.UK - Enter your children’s dates of birth',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

const getDayInputIdForIndex = (index) => `childDob-${index}-day`
const getMonthInputIdForIndex = (index) => `childDob-${index}-month`
const getYearInputIdForIndex = (index) => `childDob-${index}-year`
const getNameInputIdForIndex = (index) => `childDob-name-${index}`
const getRemoveButtonIdForIndex = (index) => `remove-child-${index}`

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
    const dateOfBirth = dateLastYear(dayIncrement)
    await this.enterChild3OrUnderDateOfBirth(dateOfBirth)
    this.childIndex++
  }

  async enterChild3OrUnderDateOfBirth (dateOfBirth) {
    await this.enterDay(dateOfBirth.getDate())
    await this.enterMonth(dateOfBirth.getMonth() + 1)
    await this.enterYear(dateOfBirth.getFullYear())
  }

  async enterChildName (name) {
    await this.enterValueForInputWithId(getNameInputIdForIndex(this.childIndex), name)
  }

  async enterDay (day) {
    await this.enterValueForInputWithId(getDayInputIdForIndex(this.childIndex), day)
  }

  async enterMonth (month) {
    await this.enterValueForInputWithId(getMonthInputIdForIndex(this.childIndex), month)
  }

  async enterYear (year) {
    await this.enterValueForInputWithId(getYearInputIdForIndex(this.childIndex), year)
  }

  async findAllRemoveChildButtons () {
    return this.findAllByClassName('govuk-button govuk-button--secondary')
  }

  async clickRemoveButtonForChild (childIndex) {
    const removeButton = await this.findById(getRemoveButtonIdForIndex(childIndex))
    await removeButton.click()
  }

  async getChildDateOfBirthDay (childIndex) {
    return this.getValueForInputWithId(getDayInputIdForIndex(childIndex))
  }

  async getChildDateOfBirthMonth (childIndex) {
    return this.getValueForInputWithId(getMonthInputIdForIndex(childIndex))
  }

  async getChildDateOfBirthYear (childIndex) {
    return this.getValueForInputWithId(getYearInputIdForIndex(childIndex))
  }

  // TODO - Can this use InputField when there are a dynamic number of them?
  async getValueForInputWithId (id) {
    const elementWithId = await this.findById(id)
    return elementWithId.getAttribute('value')
  }

  // TODO - Would like to get rid of this and use InputField
  async enterValueForInputWithId (id, value) {
    const input = await this.findById(id)
    return input.sendKeys(value)
  }

  getChildDateOfBirthFieldErrorId (index) {
    return `child-dob-${index}-error`
  }

  getChildDateOfBirthErrorLinkCss (index) {
    return `a[href="#child-dob-${index}-error"]`
  }

  getChildNameFieldErrorId (index) {
    return `childDob-name-${index}-error`
  }

  getChildNameErrorLinkCss (index) {
    return `a[href="#child-dob-name-${index}-error"]`
  }
}

module.exports = EnterChildrenDOB
