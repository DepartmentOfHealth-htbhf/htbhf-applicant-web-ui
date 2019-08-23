'use strict'

const { isNil } = require('ramda')
const SubmittablePage = require('./submittable-page')
const CHECK_ANSWERS_PAGE_TITLE = 'GOV.UK - Check your answers'
const GOV_LIST_ROW_CLASSNAME = '.govuk-summary-list__row'
const GOV_LIST_HEADER_CLASSNAME = 'govuk-summary-list__key'
const GOV_LIST_VALUE_CLASSNAME = 'govuk-summary-list__value'
const GOV_LIST_ACTION_CLASSNAME = 'govuk-summary-list__actions'
const GOV_LINK_CLASSNAME = 'govuk-link'
const GOV_HIDDEN_CLASSNAME = 'govuk-visually-hidden'
const CLAIM_SUMMARY_PARENT_ID = '#claim-summary'
const CHILDREN_SUMMARY_PARENT_ID = '#children-summary'

/**
 * Page object for the page where the customer can check their answers before submitting.
 */
class CheckAnswers extends SubmittablePage {
  getPath () {
    return '/check-answers'
  }

  getPageName () {
    return 'check answers'
  }

  async waitForPageLoad () {
    return super.waitForPageWithTitle(CHECK_ANSWERS_PAGE_TITLE)
  }

  async getContentsOfSummaryListsByParentId (parentId) {
    const tableRows = await this.findAllByCSS(`${parentId} ${GOV_LIST_ROW_CLASSNAME}`)
    const getDataForRows = tableRows.map(async (tableRow) => this.getDataForRow(tableRow))
    return Promise.all(getDataForRows)
  }

  async getClaimSummaryListContents () {
    return this.getContentsOfSummaryListsByParentId(CLAIM_SUMMARY_PARENT_ID)
  }

  async getChildrenSummaryListContents () {
    return this.getContentsOfSummaryListsByParentId(CHILDREN_SUMMARY_PARENT_ID)
  }

  async getActionFromElement (element) {
    const changeLink = await this.findByClassName(GOV_LINK_CLASSNAME, element)
    const changeUrl = await changeLink.getAttribute('href')
    const changeText = await changeLink.getText()
    const hiddenSpan = await this.findByClassName(GOV_HIDDEN_CLASSNAME, changeLink)
    const hiddenText = await hiddenSpan.getText()

    return {
      url: changeUrl,
      text: changeText.replace(hiddenText, '').trim(),
      hiddenText: hiddenText
    }
  }

  async getActionForRow (row) {
    try {
      const actions = await this.findAllByClassName(GOV_LIST_ACTION_CLASSNAME, row)
      return actions.length === 0 ? null : this.getActionFromElement(actions[0])
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getDataForRow (tableRow) {
    try {
      const header = await this.findByClassName(GOV_LIST_HEADER_CLASSNAME, tableRow)
      const headerText = await header.getText()
      const value = await this.findByClassName(GOV_LIST_VALUE_CLASSNAME, tableRow)
      const valueText = await value.getText()
      const action = await this.getActionForRow(tableRow)

      return {
        header: headerText,
        value: valueText,
        action: isNil(action) ? undefined : action
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getChangeLinksFor (headerText) {
    return this.findAllByXPath(`//a[contains(@class, 'govuk-link') and contains(.//span, '${headerText}')]`)
  }

  async clickChangeLinkFor (headerText) {
    const links = await this.getChangeLinksFor(headerText)

    if (!links.length === 1) {
      throw new Error(links.length, 'change links found for', headerText)
    }

    await links[0].click()
  }
}

module.exports = CheckAnswers
