const { Before, Given, When, Then, After } = require('cucumber')
const { expect } = require('chai')

const EnterName = require('../../common/page/enter-name')
const Overview = require('../../common/page/overview')
const DriverManager = require('../../common/driver/driver-manager')
const { PUBLIC_BASE_URL } = require('../environment')

const driverManager = new DriverManager()
let enterName
let overview
let driver

Before(function () {
  driver = driverManager.initialise()
  overview = new Overview(driver)
  enterName = new EnterName(driver)
})

After(function () {
  driver.quit()
})

Given('I navigate to the HTBHF overview page', async function () {
  await overview.open(PUBLIC_BASE_URL)

  const h1ElementText = await overview.getH1Text()
  expect(h1ElementText).to.be.equal('Overview')
})

When('I select to start the process', async function () {
  await overview.clickStartButton()
})

Then('the enter name page is shown', async function () {
  await enterName.waitForPageLoad()
})
