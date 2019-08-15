const { Given, When, Then } = require('cucumber')
const { assert } = require('chai')

const pages = require('../pages')
const { enterDetailsUpToPage } = require('./navigation')

Given(/^I have entered my details up to the (.*) page$/, async function (page) {
  try {
    await enterDetailsUpToPage({ page })
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter details up to page ${page} - ${error}`)
    throw new Error(error)
  }
})

Given(/^I am starting a new application$/, async function () {
  await pages.guidance.openApplyPage(pages.url)
})

When(/^I navigate to the (.*) page$/, async function (page) {
  try {
    await pages.openPageDirect(page)
  } catch (error) {
    throw new Error('Unexpected error caught navigating to page: ' + error)
  }
})

When(/^I go directly to the send code page$/, async function () {
  await pages.sendCode.openDirect(pages.url)
})

When(/^I go directly to the enter code page$/, async function () {
  await pages.enterCode.openDirect(pages.url)
})

When(/^I select to start the process$/, async function () {
  await pages.guidance.clickStartButton()
})

Then(/^I am shown the first page of the application$/, async function () {
  await pages.waitForFirstPage()
})
