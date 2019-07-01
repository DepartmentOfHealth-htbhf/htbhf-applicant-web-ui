const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-steps')

When(/^I select Text to how would I like to receive my code$/, async function () {
  await pages.chooseChannelForCode.selectTextRadioButton()
})

When(/^I select Email to how would I like to receive my code$/, async function () {
  await pages.chooseChannelForCode.selectEmailRadioButton()
})

Then(/^I am shown the choose channel for code page$/, async function () {
  await pages.chooseChannelForCode.waitForPageLoad()
})

Then(/^Text and Email options are displayed on the choose channel for code page$/, async function () {
  const labels = await pages.chooseChannelForCode.getAllRadioLabels()
  const text = await Promise.all(labels.map(async (label) => label.getText()))

  expect(text).to.include('Text')
  expect(text).to.include('Email')
})

Then(/^I am informed that I need to select an option for choose channel for code$/, async function () {
  await assertErrorHeaderTextPresent(pages.chooseChannelForCode)
  await assertChooseChannelForCodePresent()
})

async function assertChooseChannelForCodePresent () {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.chooseChannelForCode.getFieldErrorId(),
    pages.chooseChannelForCode.getErrorLinkCss(),
    'Select if you want to receive a code by text or email')
}
