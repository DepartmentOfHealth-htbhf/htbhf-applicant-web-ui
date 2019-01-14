const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const globals = require('./globals')
const { BASE_URL } = require('../constants')

Given('I navigate to the HTBHF overview page', async function () {
  await globals.overview.open(BASE_URL)

  const h1ElementText = await globals.overview.getH1Text()
  expect(h1ElementText).to.be.equal('Overview')
})

When('I select to start the process', async function () {
  await globals.overview.clickStartButton()
})

Then('the enter name page is shown', async function () {
  await globals.enterName.waitForPageLoad()
})
