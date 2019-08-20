'use strict'

const SubmittablePage = require('./submittable-page')
const InputField = require('./input-field')

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
class ChildDateOfBirth extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.childIndex = 1
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/child-date-of-birth'
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
    const inputField = this.getNameInputFieldForIndex(this.childIndex)
    await inputField.enterValue(name)
  }

  async enterDay (day) {
    const inputField = this.getDayInputFieldForIndex(this.childIndex)
    await inputField.enterValue(day)
  }

  async enterMonth (month) {
    const inputField = this.getMonthInputFieldForIndex(this.childIndex)
    await inputField.enterValue(month)
  }

  async enterYear (year) {
    const inputField = this.getYearInputFieldForIndex(this.childIndex)
    await inputField.enterValue(year)
  }

  getNameInputFieldForIndex (index) {
    return new InputField(getNameInputIdForIndex(index), this)
  }

  getDayInputFieldForIndex (index) {
    return new InputField(getDayInputIdForIndex(index), this)
  }

  getMonthInputFieldForIndex (index) {
    return new InputField(getMonthInputIdForIndex(index), this)
  }

  getYearInputFieldForIndex (index) {
    return new InputField(getYearInputIdForIndex(index), this)
  }

  async findAllRemoveChildButtons () {
    return this.findAllByClassName('govuk-button govuk-button--secondary')
  }

  async clickRemoveButtonForChild (childIndex) {
    const removeButton = await this.findById(getRemoveButtonIdForIndex(childIndex))
    await removeButton.click()
  }

  async getChildDateOfBirthDay (childIndex) {
    const inputField = this.getDayInputFieldForIndex(childIndex)
    return inputField.getValue()
  }

  async getChildDateOfBirthMonth (childIndex) {
    const inputField = this.getMonthInputFieldForIndex(childIndex)
    return inputField.getValue()
  }

  async getChildDateOfBirthYear (childIndex) {
    const inputField = this.getYearInputFieldForIndex(childIndex)
    return inputField.getValue()
  }

  getChildDateOfBirthFieldErrorId (index) {
    return `child-dob-${index}-error`
  }

  getChildDateOfBirthErrorLinkCss (index) {
    return `a[href="#child-dob-${index}-error"]`
  }

  getChildNameFieldErrorId (index) {
    const inputField = this.getNameInputFieldForIndex(index)
    return inputField.getInputErrorId()
  }

  getChildNameErrorLinkCss (index) {
    // TODO Should the inconsistency in camel case vs kebab case in htbhf-date-input.njk be fixed, this will fail and
    //  should be corrected to use this.getNameInputFieldForIndex(index) and getInputErrorLinkCss()
    return `a[href="#child-dob-name-${index}-error"]`
  }
}

module.exports = ChildDateOfBirth
