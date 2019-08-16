const { Given, When, Then } = require('cucumber')
const { assert, expect } = require('chai')
const { assertBackLinkPointsToPage, assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-assertions')
const { submitChild3OrUnderDetails } = require('./common-steps')
const { LONG_STRING } = require('./constants')
const { dateLastYear } = require('../../common/dates')

const pages = require('./pages')

Given(/^I enter the details of my child who is under four years old$/, async function () {
  await pages.enterChildrenDOB.enterChild3OrUnderDetails('Joe')
})

Given(/^there are no Remove Child buttons visible$/, async function () {
  const allRemoveButtons = await pages.enterChildrenDOB.findAllRemoveChildButtons()
  expect(allRemoveButtons.length).to.be.equal(0)
})

Given(/^there is a Remove Button for both children's date of birth$/, async function () {
  const allRemoveButtons = await pages.enterChildrenDOB.findAllRemoveChildButtons()
  expect(allRemoveButtons.length).to.be.equal(2)

  const allRemoveButtonIds = allRemoveButtons.map(async (button) => button.getAttribute('id'))
  const resolvedButtonIds = await Promise.all(allRemoveButtonIds)

  expect(resolvedButtonIds).to.have.members(['remove-child-1', 'remove-child-2'])
})

When(/^I submit the details of my child who is under four years old$/, async function () {
  await submitChild3OrUnderDetails()
})

When(/^I click remove for the first child's date of birth$/, async function () {
  await pages.enterChildrenDOB.clickRemoveButtonForChild(1)
})

When(/^I submit the details of my child who is under four years old without a name$/, async function () {
  await submitChild3OrUnderDetails('')
})

When(/^I submit the details of my child who is under four years old with a very long name$/, async function () {
  await submitChild3OrUnderDetails(LONG_STRING)
})

When(/^I submit the details of my two children who are under four years old/, async function () {
  await enterTwoSetsOfChildren3OrUnderDetails()
  await pages.enterChildrenDOB.submitForm()
})

When(/^I enter the details of my two children who are under four years old/, async function () {
  await enterTwoSetsOfChildren3OrUnderDetails()
})

When(/^I submit the details of my ten children who are under four years old/, async function () {
  await submitTenSetsOfChildren3OrUnderDetails()
})

When(/^I submit the details of my two children who are under four years both with very long names/, async function () {
  await enterTwoSetsOfChildren3OrUnderDetails(LONG_STRING, LONG_STRING)
  await pages.enterChildrenDOB.submitForm()
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

Then(/^I am informed that the first child must be under four$/, async function () {
  await assertChildUnder4ErrorPresentForChild(1)
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

Then(/^I only see the second child's date of birth$/, async function () {
  const childDobDay = await pages.enterChildrenDOB.getChildDateOfBirthDay(1)
  const childDobMonth = await pages.enterChildrenDOB.getChildDateOfBirthMonth(1)
  const childDobYear = await pages.enterChildrenDOB.getChildDateOfBirthYear(1)

  // The second child will have the date incremented by 1 day
  const dateOfBirthForSecondChild = dateLastYear(1)

  expect(childDobDay).to.be.equal(dateOfBirthForSecondChild.getDate().toString())
  expect(childDobMonth).to.be.equal((dateOfBirthForSecondChild.getMonth() + 1).toString())
  expect(childDobYear).to.be.equal(dateOfBirthForSecondChild.getFullYear().toString())
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

async function assertChildUnder4ErrorPresentForChild (index) {
  try {
    await assertErrorHeaderTextPresent(pages.enterChildrenDOB)
    await assertFieldErrorAndLinkTextPresentAndCorrect(
      pages.enterChildrenDOB.getChildDateOfBirthFieldErrorId(index),
      pages.enterChildrenDOB.getChildDateOfBirthErrorLinkCss(index),
      'You can only apply for children who are under 4 years old')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert the date of birth error present for child with index ${index} - ${error}`)
  }
}

async function enterTwoSetsOfChildren3OrUnderDetails (firstChildName = 'Joe', secondChildName = 'Joanne') {
  try {
    await pages.enterChildrenDOB.enterChild3OrUnderDetails(firstChildName, 0)
    await pages.enterChildrenDOB.clickAddAnotherChild()
    await pages.enterChildrenDOB.enterChild3OrUnderDetails(secondChildName, 1)
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
