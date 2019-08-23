const { expect } = require('chai')
const { When, Then } = require('cucumber')
const {
  FULL_NAME,
  VALID_ELIGIBLE_NINO,
  DATE_OF_BIRTH,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  TOWN,
  COUNTY,
  POSTCODE,
  FULL_ADDRESS,
  FULL_ADDRESS_NO_LINE_2,
  FULL_ADDRESS_NO_COUNTY,
  YES_LABEL,
  NO_LABEL,
  PHONE_NUMBER,
  EMAIL_ADDRESS,
  CHILDRENS_DATES_OF_BIRTH
} = require('./constants')

const pages = require('./pages')
const { DEFAULT_ACTION_OPTIONS } = require('./navigation/default-action-options')
const { enterDetailsUpToPage } = require('./navigation')
const { formatDateForDisplayFromDate } = require('../../../web/routes/application/common/formatters')
const { assertBackLinkPointsToPage } = require('./common-assertions')

When(/^I complete the application with valid details that contains malicious input$/, async function () {
  const actionOptions = { ...DEFAULT_ACTION_OPTIONS, firstName: '<script>window.alert(\'Boo\')</script>' }
  await enterDetailsUpToPage({ page: pages.checkAnswers.getPageName(), actionOptions })
})

When(/^I complete the application with valid details for an applicant with no second line of address$/, async function () {
  await completeApplicationWithAddressDetails(ADDRESS_LINE_1, '', TOWN, COUNTY, POSTCODE)
})

When(/^I complete the application with valid details for an applicant with no county$/, async function () {
  await completeApplicationWithAddressDetails(ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, '', POSTCODE)
})

When(/^I choose to change my answer to are you pregnant$/, async function () {
  await pages.checkAnswers.clickChangeLinkFor('Are you pregnant?')
})

When(/^I choose to change my answer to Do you live in Scotland$/, async function () {
  await pages.checkAnswers.clickChangeLinkFor('Do you live in Scotland?')
})

When(/^I choose to change my answer to Do you have children$/, async function () {
  await pages.checkAnswers.clickChangeLinkFor('Children under 4 years old?')
})

When(/^I choose to change my phone number$/, async function () {
  await pages.checkAnswers.clickChangeLinkFor('Mobile telephone number')
})

When(/^I choose to change my email address$/, async function () {
  await pages.checkAnswers.clickChangeLinkFor('Email address')
})

Then(/^The back link on the check answers page links to the email address page$/, async function () {
  await assertBackLinkPointsToPage(pages.emailAddress)
})

Then(/^the check answers page contains all data entered for a pregnant woman$/, async function () {
  const claimContents = await pages.checkAnswers.getClaimSummaryListContents()
  const childrenContents = await pages.checkAnswers.getChildrenSummaryListContents()
  assertNameShown(claimContents)
  assertNinoShown(claimContents)
  assertDobShown(claimContents)
  assertAreYouPregnantValueShown(claimContents, YES_LABEL)
  assertDueDateShownInSixMonths(claimContents)
  assertFullAddressShown(claimContents)
  assertPhoneNumberShown(claimContents)
  assertEmailAddressShown(claimContents)
  assertDoYouHaveChildrenIsShown(claimContents, YES_LABEL)
  assertChildrensDatesOfBirthIsShown(childrenContents, CHILDRENS_DATES_OF_BIRTH)
})

Then(/^the check answers page contains all data entered for a woman who is not pregnant$/, async function () {
  const claimContents = await pages.checkAnswers.getClaimSummaryListContents()
  const childrenContents = await pages.checkAnswers.getChildrenSummaryListContents()
  assertNameShown(claimContents)
  assertNinoShown(claimContents)
  assertDobShown(claimContents)
  assertAreYouPregnantValueShown(claimContents, NO_LABEL)
  assertNoValueForField(claimContents, 'Baby’s due date')
  assertFullAddressShown(claimContents)
  assertPhoneNumberShown(claimContents)
  assertEmailAddressShown(claimContents)
  assertDoYouHaveChildrenIsShown(claimContents, YES_LABEL)
  assertChildrensDatesOfBirthIsShown(childrenContents, CHILDRENS_DATES_OF_BIRTH)
})

Then(/^the check answers page contains all data entered for an applicant with no second line of address$/, async function () {
  await assertCheckAnswersWithAddressForClaimantWithChildrenAndNotPregnant(FULL_ADDRESS_NO_LINE_2)
})

Then(/^the check answers page contains all data entered for an applicant with no county$/, async function () {
  await assertCheckAnswersWithAddressForClaimantWithChildrenAndNotPregnant(FULL_ADDRESS_NO_COUNTY)
})

Then(/^all page content is present on the check answers page$/, async function () {
  await allPageContentIsCorrectOnCheckPage()
})

Then(/^I am shown the check answers page$/, async function () {
  await pages.checkAnswers.waitForPageLoad()
})

Then(/^I am shown the check answers page with correct page content$/, async function () {
  await pages.checkAnswers.waitForPageLoad()
  await allPageContentIsCorrectOnCheckPage()
})

Then(/^there are no children displayed$/, async function () {
  await assertChildrensDatesOfBirthIsNotShown()
})

async function completeApplicationWithAddressDetails (addressLine1, addressLine2, townOrCity, county, postcode) {
  const actionOptions = { ...DEFAULT_ACTION_OPTIONS, addressLine1, addressLine2, townOrCity, county, postcode }
  await enterDetailsUpToPage({ page: pages.checkAnswers.getPageName(), actionOptions })
}

async function assertCheckAnswersWithAddressForClaimantWithChildrenAndNotPregnant (fullAddress) {
  const claimContents = await pages.checkAnswers.getClaimSummaryListContents()
  const childrenContents = await pages.checkAnswers.getChildrenSummaryListContents()
  assertNameShown(claimContents)
  assertNinoShown(claimContents)
  assertDobShown(claimContents)
  assertAreYouPregnantValueShown(claimContents, NO_LABEL)
  assertNoValueForField(claimContents, 'Baby’s due date')
  assertAddressShown(claimContents, fullAddress)
  assertPhoneNumberShown(claimContents)
  assertEmailAddressShown(claimContents)
  assertDoYouHaveChildrenIsShown(claimContents, YES_LABEL)
  await assertChildrensDatesOfBirthIsShown(childrenContents, CHILDRENS_DATES_OF_BIRTH)
}

async function allPageContentIsCorrectOnCheckPage () {
  const h1Text = await pages.checkAnswers.getH1Text()
  expect(h1Text.toString().trim()).to.have.lengthOf.at.least(1, 'expected check page H1 text to not be empty')
  const h2Text = await pages.checkAnswers.getH2Text()
  expect(h2Text.toString().trim()).to.have.lengthOf.at.least(1, 'expected check page H2 text to not be empty')
  const submitButtonText = await pages.checkAnswers.getSubmitButtonText()
  expect(submitButtonText.toString().trim()).to.have.lengthOf.at.least(1, 'expected submit button text to not be empty')
  const claimContents = await pages.checkAnswers.getClaimSummaryListContents()
  assertHeaderAndChangeLinkShownForEachRow(claimContents)
  const childrenContents = await pages.checkAnswers.getChildrenSummaryListContents()
  assertHeaderTextShownForEachRow(childrenContents)
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

function assertNameShown (contents) {
  const nameValue = getValueForField(contents, 'Your name')
  expect(nameValue).to.be.equal(FULL_NAME)
}

function assertNinoShown (contents) {
  const ninoValue = getValueForField(contents, 'National Insurance number')
  expect(ninoValue).to.be.equal(VALID_ELIGIBLE_NINO)
}

function assertDobShown (contents) {
  const dobValue = getValueForField(contents, 'Date of birth')
  expect(dobValue).to.be.equal(DATE_OF_BIRTH)
}

function assertAreYouPregnantValueShown (contents, expectedValue) {
  const areYouPregnantValue = getValueForField(contents, 'Are you pregnant?')
  expect(areYouPregnantValue).to.be.equal(expectedValue)
}

function assertDueDateShownInSixMonths (contents) {
  const dueDateValue = getValueForField(contents, 'Baby’s due date')
  expect(dueDateValue).to.be.equal(getDateInSixMonths())
}

function assertFullAddressShown (contents) {
  assertAddressShown(contents, FULL_ADDRESS)
}

function assertAddressShown (contents, expectedAddress) {
  const addressValue = getValueForField(contents, 'Address')
  expect(addressValue).to.be.equal(expectedAddress)
}

function assertPhoneNumberShown (contents) {
  const phoneNumberValue = getValueForField(contents, 'Mobile telephone number')
  expect(phoneNumberValue).to.be.equal(PHONE_NUMBER)
}

function assertEmailAddressShown (contents) {
  const emailAddressValue = getValueForField(contents, 'Email address')
  expect(emailAddressValue).to.be.equal(EMAIL_ADDRESS)
}

function assertDoYouHaveChildrenIsShown (contents, expectedValue) {
  const doYouHaveChildrenValue = getValueForField(contents, 'Children under 4 years old?')
  expect(doYouHaveChildrenValue).to.be.equal(expectedValue)
}

async function assertChildrensDatesOfBirthChangeLinkIsShown () {
  const changeLinks = await pages.checkAnswers.getChangeLinksFor('Children’s date of birth')
  expect(changeLinks.length).to.be.equal(1)
}

async function assertChildrensDatesOfBirthIsShown (contents, expectedValues) {
  expectedValues.forEach((expected) => {
    const value = getValueForField(contents, expected.header)
    expect(value).to.be.equal(expected.value)
  })

  await assertChildrensDatesOfBirthChangeLinkIsShown()
}

async function assertChildrensDatesOfBirthIsNotShown () {
  const childrenSummary = await pages.checkAnswers.findAllById('children-summary')
  expect(childrenSummary.length).to.be.equal(0)
}

function hasChangeLink (row) {
  return row.action.text === 'Change'
}

function hasHeaderText (row) {
  return row.header.trim().length > 0
}

function hasChangeLinkAndHeaderText (row) {
  return hasChangeLink(row) && hasHeaderText(row)
}

function assertHeaderTextShownForEachRow (contents) {
  const matchingRows = contents.filter(hasHeaderText)
  expect(matchingRows.length).to.be.equal(contents.length)
}

function assertHeaderAndChangeLinkShownForEachRow (contents) {
  const matchingRows = contents.filter(hasChangeLinkAndHeaderText)
  expect(matchingRows.length).to.be.equal(contents.length)
}
