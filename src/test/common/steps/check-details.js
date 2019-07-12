const { expect } = require('chai')
const { When, Then } = require('cucumber')
const {
  LAST_NAME,
  FULL_NAME,
  VALID_ELIGIBLE_NINO,
  DATE_OF_BIRTH,
  ADDRESS_LINE_1,
  TOWN,
  POSTCODE,
  FULL_ADDRESS,
  FULL_ADDRESS_NO_LINE_2,
  YES_LABEL,
  NO_LABEL,
  PHONE_NUMBER,
  EMAIL_ADDRESS
} = require('./constants')

const pages = require('./pages')
const {
  selectNoOnPregnancyPage,
  enterNameAndSubmit,
  enterNinoAndSubmit,
  enterDateOfBirthAndSubmit,
  enterCardAddressAndSubmit,
  enterPhoneNumberAndSubmit,
  enterDoYouLiveInScotlandNoAndSubmit,
  enterEmailAddressAndSubmit,
  selectNoOnChildrenThreeOrYoungerPage,
  selectTextOnSendCode,
  enterConfirmationCodeAndSubmit
} = require('./common-steps')
const { formatDateForDisplayFromDate } = require('../../../web/routes/application/common/formatters')
const { assertBackLinkPointsToPage } = require('./common-assertions')

When(/^I complete the application with valid details that contains malicious input$/, async function () {
  await enterDoYouLiveInScotlandNoAndSubmit()
  await enterDateOfBirthAndSubmit()
  await selectNoOnChildrenThreeOrYoungerPage()
  await selectNoOnPregnancyPage()
  await enterNameAndSubmit('<script>window.alert(\'Boo\')</script>', LAST_NAME)
  await enterNinoAndSubmit()
  await enterCardAddressAndSubmit()
  await enterPhoneNumberAndSubmit()
  await enterEmailAddressAndSubmit()
  await selectTextOnSendCode()
  await enterConfirmationCodeAndSubmit()
})

When(/^I complete the application with valid details for an applicant with no second line of address$/, async function () {
  await enterDoYouLiveInScotlandNoAndSubmit()
  await enterDateOfBirthAndSubmit()
  await selectNoOnChildrenThreeOrYoungerPage()
  await selectNoOnPregnancyPage()
  await enterNameAndSubmit()
  await enterNinoAndSubmit()
  await enterCardAddressAndSubmit(ADDRESS_LINE_1, '', TOWN, POSTCODE)
  await enterPhoneNumberAndSubmit()
  await enterEmailAddressAndSubmit()
  await selectTextOnSendCode()
  await enterConfirmationCodeAndSubmit()
})

When(/^I choose to change my answer to are you pregnant$/, async function () {
  await pages.check.clickChangeLinkFor('Are you pregnant?')
})

When(/^I choose to change my answer to Do you live in Scotland$/, async function () {
  await pages.check.clickChangeLinkFor('Do you live in Scotland?')
})

When(/^I choose to change my answer to phone number$/, async function () {
  await pages.check.clickChangeLinkFor('Mobile telephone number')
})

When(/^I choose to change my answer to email address$/, async function () {
  await pages.check.clickChangeLinkFor('Email address')
})

Then(/^The back link on the check details page links to the email address page$/, async function () {
  await assertBackLinkPointsToPage(pages.emailAddress)
})

Then(/^the check details page contains all data entered for a pregnant woman$/, async function () {
  const tableContents = await pages.check.getCheckDetailsTableContents()
  assertNameShown(tableContents)
  assertNinoShown(tableContents)
  assertDobShown(tableContents)
  assertAreYouPregnantValueShown(tableContents, YES_LABEL)
  assertDueDateShownInSixMonths(tableContents)
  assertFullAddressShown(tableContents)
  assertPhoneNumberShown(tableContents)
  assertEmailAddressShown(tableContents)
})

Then(/^the check details page contains all data entered for a woman who is not pregnant$/, async function () {
  const tableContents = await pages.check.getCheckDetailsTableContents()
  assertNameShown(tableContents)
  assertNinoShown(tableContents)
  assertDobShown(tableContents)
  assertAreYouPregnantValueShown(tableContents, NO_LABEL)
  assertNoValueForField(tableContents, 'Baby’s due date')
  assertFullAddressShown(tableContents)
  assertPhoneNumberShown(tableContents)
  assertEmailAddressShown(tableContents)
})

Then(/^the check details page contains all data entered for an applicant with no second line of address$/, async function () {
  const tableContents = await pages.check.getCheckDetailsTableContents()
  assertNameShown(tableContents)
  assertNinoShown(tableContents)
  assertDobShown(tableContents)
  assertAreYouPregnantValueShown(tableContents, NO_LABEL)
  assertNoValueForField(tableContents, 'Baby’s due date')
  assertAddressShownWithNoSecondLine(tableContents)
  assertPhoneNumberShown(tableContents)
  assertEmailAddressShown(tableContents)
})

Then(/^all page content is present on the check details page$/, async function () {
  await allPageContentIsCorrectOnCheckPage()
})

Then(/^I am shown the check details page$/, async function () {
  await pages.check.waitForPageLoad()
})

Then(/^I am shown the check details page with correct page content$/, async function () {
  await pages.check.waitForPageLoad()
  await allPageContentIsCorrectOnCheckPage()
})

async function allPageContentIsCorrectOnCheckPage () {
  const h1Text = await pages.check.getH1Text()
  expect(h1Text.toString().trim()).to.have.lengthOf.at.least(1, 'expected check page H1 text to not be empty')
  const h2Text = await pages.check.getH2Text()
  expect(h2Text.toString().trim()).to.have.lengthOf.at.least(1, 'expected check page H2 text to not be empty')
  const submitButtonText = await pages.check.getSubmitButtonText()
  expect(submitButtonText.toString().trim()).to.have.lengthOf.at.least(1, 'expected submit button text to not be empty')
  const tableContents = await pages.check.getCheckDetailsTableContents()
  assertHeaderAndChangeLinkShownForEachRow(tableContents)
}

function getValueForField (tableContents, fieldName) {
  const matchingRows = tableContents.filter((value) => value.header === fieldName)
  expect(matchingRows).to.have.lengthOf(1, `must only have one row matching key: ${fieldName}`)
  return matchingRows[0].value
}

function assertNoValueForField (tableContents, fieldName) {
  const matchingRows = tableContents.filter((value) => value.header === fieldName)
  expect(matchingRows).to.have.lengthOf(0, `must have no rows matching key: ${fieldName}, found: ${matchingRows}`)
}

function getDateInSixMonths () {
  const date = new Date()
  date.setMonth(date.getMonth() + 6)

  return formatDateForDisplayFromDate(date)
}

function assertNameShown (tableContents) {
  const nameValue = getValueForField(tableContents, 'Your name')
  expect(nameValue).to.be.equal(FULL_NAME)
}

function assertNinoShown (tableContents) {
  const ninoValue = getValueForField(tableContents, 'National Insurance number')
  expect(ninoValue).to.be.equal(VALID_ELIGIBLE_NINO)
}

function assertDobShown (tableContents) {
  const dobValue = getValueForField(tableContents, 'Date of birth')
  expect(dobValue).to.be.equal(DATE_OF_BIRTH)
}

function assertAreYouPregnantValueShown (tableContents, expectedValue) {
  const areYouPregnantValue = getValueForField(tableContents, 'Are you pregnant?')
  expect(areYouPregnantValue).to.be.equal(expectedValue)
}

function assertDueDateShownInSixMonths (tableContents) {
  const dueDateValue = getValueForField(tableContents, 'Baby’s due date')
  expect(dueDateValue).to.be.equal(getDateInSixMonths())
}

function assertFullAddressShown (tableContents) {
  assertAddressShown(tableContents, FULL_ADDRESS)
}

function assertAddressShownWithNoSecondLine (tableContents) {
  assertAddressShown(tableContents, FULL_ADDRESS_NO_LINE_2)
}

function assertAddressShown (tableContents, expectedAddress) {
  const addressValue = getValueForField(tableContents, 'Address')
  expect(addressValue).to.be.equal(expectedAddress)
}

function assertPhoneNumberShown (tableContents) {
  const phoneNumberValue = getValueForField(tableContents, 'Mobile telephone number')
  expect(phoneNumberValue).to.be.equal(PHONE_NUMBER)
}

function assertEmailAddressShown (tableContents) {
  const emailAddressValue = getValueForField(tableContents, 'Email address')
  expect(emailAddressValue).to.be.equal(EMAIL_ADDRESS)
}

function hasChangeLinkAndHeaderText (row) {
  return row.action.text === 'Change' && row.header.trim().length > 0
}

function assertHeaderAndChangeLinkShownForEachRow (tableContents) {
  const matchingRows = tableContents.filter(hasChangeLinkAndHeaderText)
  expect(matchingRows.length).to.be.equal(tableContents.length)
}
