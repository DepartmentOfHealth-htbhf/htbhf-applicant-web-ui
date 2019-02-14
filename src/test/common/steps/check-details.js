const { expect } = require('chai')
const { When, Then } = require('cucumber')
const {
  FIRST_NAME,
  LAST_NAME,
  FULL_NAME,
  VALID_NINO,
  DAY,
  MONTH,
  YEAR,
  DATE_OF_BIRTH,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  TOWN,
  POSTCODE,
  FULL_ADDRESS,
  FULL_ADDRESS_NO_LINE_2,
  YES,
  NO
} = require('./constants')

const pages = require('./pages')
const {
  selectNoOnPregnancyPage,
  enterNameAndSubmit,
  enterNinoAndSubmit,
  enterDateOfBirth,
  enterCardAddress
} = require('./common-steps')
const { formatDateForDisplayFromDate } = require('../../../web/routes/application/common/formatters')

When(/^I complete the application with valid details that contains malicious input$/, async function () {
  await enterNameAndSubmit('<script>window.alert(\'Boo\')</script>', LAST_NAME)
  await enterNinoAndSubmit(VALID_NINO)
  await enterDateOfBirth(DAY, MONTH, YEAR)
  await selectNoOnPregnancyPage()
  await enterCardAddress(ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, POSTCODE)
})

When(/^I complete the application with valid details for an applicant with no second line of address$/, async function () {
  await enterNameAndSubmit(FIRST_NAME, LAST_NAME)
  await enterNinoAndSubmit(VALID_NINO)
  await enterDateOfBirth(DAY, MONTH, YEAR)
  await selectNoOnPregnancyPage()
  await enterCardAddress(ADDRESS_LINE_1, '', TOWN, POSTCODE)
})

When(/^I choose to change my answer to are you pregnant$/, async function () {
  await pages.check.clickChangeLinkFor('Are you pregnant?')
})

Then(/^the check details page contains all data entered for a pregnant woman$/, async function () {
  const tableContents = await pages.check.getCheckDetailsTableContents()
  assertNameShown(tableContents)
  assertNinoShown(tableContents)
  assertDobShown(tableContents)
  assertAreYouPregnantValueShown(tableContents, YES)
  assertDueDateShownInSixMonths(tableContents)
  assertFullAddressShown(tableContents)
})

Then(/^the check details page contains all data entered for a woman who is not pregnant$/, async function () {
  const tableContents = await pages.check.getCheckDetailsTableContents()
  assertNameShown(tableContents)
  assertNinoShown(tableContents)
  assertDobShown(tableContents)
  assertAreYouPregnantValueShown(tableContents, NO)
  assertNoValueForField(tableContents, 'Baby\'s due date')
  assertFullAddressShown(tableContents)
})

Then(/^the check details page contains all data entered for an applicant with no second line of address$/, async function () {
  const tableContents = await pages.check.getCheckDetailsTableContents()
  assertNameShown(tableContents)
  assertNinoShown(tableContents)
  assertDobShown(tableContents)
  assertAreYouPregnantValueShown(tableContents, NO)
  assertNoValueForField(tableContents, 'Baby\'s due date')
  assertAddressShownWithNoSecondLine(tableContents)
})

Then(/^all page content is present on the check details page$/, async function () {
  await allPageContentIsCorrectOnCheckPage()
})

Then(/^I am shown the check details page$/, async function () {
  await pages.check.waitForPageLoad()
})

Then(/^I am shown a valid check details page with all my details$/, async function () {
  await pages.check.waitForPageLoad()
  await allPageContentIsCorrectOnCheckPage()
})

async function allPageContentIsCorrectOnCheckPage () {
  const h1Text = await pages.check.getH1Text()
  expect(h1Text.toString().trim()).to.have.lengthOf.at.least(1, 'expected check page H1 text to not be empty')
  const h2Text = await pages.check.getH2Text()
  expect(h2Text.toString().trim()).to.have.lengthOf.at.least(1, 'expected check page H2 text to not be empty')
  const sendApplicationHelperText = await pages.check.getSendApplicationHelperText()
  expect(sendApplicationHelperText.toString().trim()).to.have.lengthOf.at.least(1, 'expected send application helper text to not be empty')
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
  expect(ninoValue).to.be.equal(VALID_NINO)
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
  const dueDateValue = getValueForField(tableContents, 'Baby\'s due date')
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

function hasChangeLinkAndHeaderText (row) {
  return row.action.text === 'Change' && row.header.trim().length > 0
}

function assertHeaderAndChangeLinkShownForEachRow (tableContents) {
  const matchingRows = tableContents.filter(hasChangeLinkAndHeaderText)
  expect(matchingRows.length).to.be.equal(tableContents.length)
}
