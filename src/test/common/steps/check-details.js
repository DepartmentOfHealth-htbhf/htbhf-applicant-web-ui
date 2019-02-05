const { expect } = require('chai')
const { Then } = require('cucumber')
const { VALID_NINO } = require('./constants')

const pages = require('./pages')

Then(/^the check details page contains all data entered$/, async function () {
  const tableContents = await pages.check.getCheckDetailsTableContents()
  const nameValue = getValueForField(tableContents, 'Name')
  expect(nameValue).to.be.equal('Lisa Simpson')
  const ninoValue = getValueForField(tableContents, 'National insurance number')
  expect(ninoValue).to.be.equal(VALID_NINO)
  const dobValue = getValueForField(tableContents, 'Date of birth')
  expect(dobValue).to.be.equal('30 12 1980')
  const areYouPregnantValue = getValueForField(tableContents, 'Are you pregnant?')
  expect(areYouPregnantValue).to.be.equal('Yes')
  const dueDateValue = getValueForField(tableContents, 'Baby\'s due date')
  expect(dueDateValue).to.be.equal(getDateInSixMonths())
  const addressValue = getValueForField(tableContents, 'Address')
  expect(addressValue).to.be.equal('Flat b\n123 Fake street\nSpringfield\nAA11BB')
})

Then(/^all page content is present on the check details page$/, async function () {
  const h1Text = await pages.check.getH1Text()
  expect(h1Text.toString().trim()).to.have.lengthOf.at.least(1, 'expected check page H1 text to not be empty')
  const h2Text = await pages.check.getH2Text()
  expect(h2Text.toString().trim()).to.have.lengthOf.at.least(1, 'expected check page H2 text to not be empty')
  const sendApplicationHelperText = await pages.check.getSendApplicationHelperText()
  expect(sendApplicationHelperText.toString().trim()).to.have.lengthOf.at.least(1, 'expected send application helper text to not be empty')
  const submitButtonText = await pages.check.getSubmitButtonText()
  expect(submitButtonText.toString().trim()).to.have.lengthOf.at.least(1, 'expected submit button text to not be empty')
})

function getValueForField (tableContents, fieldName) {
  const matchingRows = tableContents.filter((value) => value.header === fieldName)
  expect(matchingRows).to.have.lengthOf(1, `must only have one row matching key: ${fieldName}`)
  return matchingRows[0].value
}

function getDateInSixMonths () {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + 6)
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  return `${day} ${month} ${year}`
}
