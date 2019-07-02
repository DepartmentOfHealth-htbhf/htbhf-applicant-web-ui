const { expect, assert } = require('chai')

const pages = require('./pages')

const { YES_LABEL, NO_LABEL } = require('./constants')

async function assertBackLinkPointsToPage (expectedPage) {
  const backLinkPresent = await expectedPage.isBackLinkPresent()
  expect(backLinkPresent).to.equal(true, 'Back link should be present on the page')

  const backLink = await expectedPage.getBackLink()
  const href = await backLink.getAttribute('href')
  const expectedUrl = `${pages.url}${expectedPage.getPath()}`
  const correctHref = href === expectedUrl || href.startsWith(expectedUrl + '?')
  expect(correctHref).to.equal(true, `back link url should be '${expectedUrl}', is '${href}'`)
}

async function assertErrorHeaderTextPresent (page, message = `There’s a problem`) {
  try {
    await page.waitForPageLoad()
    const errorHeader = await page.getPageErrorHeaderText()
    expect(errorHeader).to.equal(message)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert error header text is present - ${error}`)
  }
}

async function assertFieldErrorAndLinkTextPresentAndCorrect (fieldErrorId, errorLinkCss, expectedErrorMessage) {
  try {
    const fieldError = await pages.genericPage.findById(fieldErrorId)
    const fieldErrorText = await pages.genericPage.getVisibleTextFromFieldError(fieldError)

    const errorLink = await pages.genericPage.findByCSS(errorLinkCss)
    const errorLinkText = await errorLink.getText()

    expect(fieldErrorText).to.be.equal(expectedErrorMessage)
    expect(errorLinkText).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert field error is present - ${error}`)
  }
}

async function assertYesNoOptionsAreDisplayed (page) {
  const labels = await page.getAllRadioLabels()
  const text = await Promise.all(labels.map(async (label) => label.getText()))

  expect(text).to.include(YES_LABEL)
  expect(text).to.include(NO_LABEL)
}

module.exports = {
  assertBackLinkPointsToPage,
  assertErrorHeaderTextPresent,
  assertFieldErrorAndLinkTextPresentAndCorrect,
  assertYesNoOptionsAreDisplayed
}
