const { When, Then } = require('cucumber')
const { assert } = require('chai')
const { assertBackLinkPointsToPage, assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-assertions')
const { submitChild3OrUnderDetails } = require('./common-steps')
const { LONG_STRING } = require('./constants')

const pages = require('./pages')

When(/^I submit the details of my child who is three or younger$/, async function () {
  await submitChild3OrUnderDetails()
  await pages.genericPage.submitForm()
})

When(/^I submit the details of my child who is three or younger without a name$/, async function () {
  await submitChild3OrUnderDetails('')
})

When(/^I submit the details of my child who is three or under with a very long name$/, async function () {
  await submitChild3OrUnderDetails(LONG_STRING)
})

When(/^I submit the details of my two children who are three or younger/, async function () {
  await submitTwoSetsOfChildren3OrUnderDetails()
})

When(/^I submit the details of my ten children who are three or younger/, async function () {
  await submitTenSetsOfChildren3OrUnderDetails()
})

When(/^I submit the details of my two children who are three or under both with very long names/, async function () {
  await submitTwoSetsOfChildren3OrUnderDetails(LONG_STRING, LONG_STRING)
})

When(/^I do not enter my child's date of birth/, async function () {
  // intentionally does nothing
})

When(/^I select to add another child/, async function () {
  await pages.enterChildrenDOB.clickAddAnotherChild()
})

When(/^I enter a future date as my child's date of birth/, async function () {
  await submitDateOfBirthInFuture()
})

Then(/^I am shown the enter your childrens dates of birth page$/, async function () {
  await pages.enterChildrenDOB.waitForPageLoad()
})

Then(/^The back link points to the Enter your children’s dates of birth page$/, async function () {
  await assertBackLinkPointsToPage(pages.enterChildrenDOB)
})

Then(/^I am informed that I need to enter the date of birth for the first child$/, async function () {
  await assertDateOfBirthErrorPresentForChild(1)
})

Then(/^I am informed that I need to enter the date of birth for both children$/, async function () {
  await assertDateOfBirthErrorPresentForChild(1)
  await assertDateOfBirthErrorPresentForChild(2)
})

Then(/^I am informed that I need to enter a shorter name for both children$/, async function () {
  await assertNameTooLongErrorPresentForChild(1)
  await assertNameTooLongErrorPresentForChild(2)
})

Then(/^I am informed that I need to enter a shorter name$/, async function () {
  await assertNameTooLongErrorPresentForChild(1)
})

async function assertNameTooLongErrorPresentForChild (index) {
  try {
    await assertErrorHeaderTextPresent(pages.enterChildrenDOB)
    await assertFieldErrorAndLinkTextPresentAndCorrect(
      pages.enterChildrenDOB.getChildNameFieldErrorId(index),
      pages.enterChildrenDOB.getChildNameErrorLinkCss(index),
      'Enter a shorter name')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert the too long name error present for child with index ${index} - ${error}`)
  }
}

async function assertDateOfBirthErrorPresentForChild (index) {
  try {
    await assertErrorHeaderTextPresent(pages.enterChildrenDOB)
    await assertFieldErrorAndLinkTextPresentAndCorrect(
      pages.enterChildrenDOB.getChildDateOfBirthFieldErrorId(index),
      pages.enterChildrenDOB.getChildDateOfBirthErrorLinkCss(index),
      'Enter your child’s date of birth')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert the date of birth error present for child with index ${index} - ${error}`)
  }
}

async function submitTwoSetsOfChildren3OrUnderDetails (firstChildName = 'Joe', secondChildName = 'Joanne') {
  try {
    await pages.enterChildrenDOB.enterChild3OrUnderDetails(firstChildName, 0)
    await pages.enterChildrenDOB.clickAddAnotherChild()
    await pages.enterChildrenDOB.enterChild3OrUnderDetails(secondChildName, 0)
    await pages.enterChildrenDOB.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter two sets of children details and submit the page - ${error}`)
  }
}

async function submitDateOfBirthInFuture () {
  try {
    const dateInFuture = new Date()
    dateInFuture.setFullYear(dateInFuture.getFullYear() + 5)
    await pages.enterChildrenDOB.enterChild3OrUnderDateOfBirth(dateInFuture)
    await pages.enterChildrenDOB.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter future date of birth and submit the page - ${error}`)
  }
}

async function submitTenSetsOfChildren3OrUnderDetails () {
  try {
    for (let childIndex = 1; childIndex <= 10; childIndex++) {
      await enterChildDetailsAndClickAddAnother(childIndex, (childIndex < 10))
    }
    await pages.enterChildrenDOB.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter ten sets of children details and submit the page - ${error}`)
  }
}

async function enterChildDetailsAndClickAddAnother (childIndex, shouldClickAddAnother) {
  await pages.enterChildrenDOB.enterChild3OrUnderDetails(`Child${childIndex}`, childIndex)
  if (shouldClickAddAnother) {
    await pages.enterChildrenDOB.clickAddAnotherChild()
  }
}
