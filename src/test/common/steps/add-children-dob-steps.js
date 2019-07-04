const { When, Then } = require('cucumber')
const { assert } = require('chai')
const { assertBackLinkPointsToPage } = require('./common-assertions')
const { enterChildUnder3Details } = require('./common-steps')

const pages = require('./pages')

When(/^I enter the details of my child who is under 3$/, async function () {
  await enterChildUnder3Details()
})

When(/^I enter the details of my child who is under 3 without a name$/, async function () {
  await enterChildUnder3DetailsWithoutAName()
})

When(/^I enter the details of my two children who are under 3/, async function () {
  await enterTwoSetsOfChildrensDatesOfBirth()
})

Then(/^I am shown the add your childrens dates of birth page$/, async function () {
  await pages.addChildrenDOB.waitForPageLoad()
})

Then(/^The back link points to the Add your children’s dates of birth page$/, async function () {
  await assertBackLinkPointsToPage(pages.addChildrenDOB)
})

async function enterTwoSetsOfChildrensDatesOfBirth () {
  try {
    await pages.addChildrenDOB.enterChildUnder3Details()
    await pages.addChildrenDOB.clickAddAnotherChild()
    await pages.addChildrenDOB.enterChildUnder3Details()
    await pages.addChildrenDOB.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter two sets of children details and submit the page - ${error}`)
  }
}

async function enterChildUnder3DetailsWithoutAName () {
  try {
    await pages.addChildrenDOB.enterChildUnder3DetailsWithoutAName()
    await pages.addChildrenDOB.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter child details and submit the page - ${error}`)
  }
}
