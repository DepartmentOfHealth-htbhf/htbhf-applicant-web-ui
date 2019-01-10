const { Before, Given, When, Then, After } = require('cucumber')
const { expect } = require('chai')

const EnterName = require('../../common/page/enter-name')
const Overview = require('../../common/page/overview')
const DriverManager = require('../../common/driver/driver-manager')
const { BASE_URL } = require('../constants')

const driverManager = new DriverManager()
let enterName
let overview
let driver

const LONG_NAME = 'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 100
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 200
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 300
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 400
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 500
  'This name is way too long'

Before(function () {
  driver = driverManager.initialise()
  overview = new Overview(driver)
  enterName = new EnterName(driver)
})

After(function () {
  driver.quit()
})

Given('I navigate to the HTBHF website and start the application process', async function () {
  await overview.open(BASE_URL)

  const h1ElementText = await overview.getH1Text()
  expect(h1ElementText).to.be.equal('Start page')
  await overview.clickStartButton()
})

When('I enter a first name which is too long', async function () {
  await enterName.waitForPageLoad()
  await enterName.enterFirstName(LONG_NAME)
  await enterName.enterLastName('Bloggs')
  await enterName.submitForm()
  await enterName.waitForPageLoad()
})

Then('I am informed that the first name is too long', async function () {
  const errorHeader = await enterName.getPageErrorHeaderText()
  expect(errorHeader).to.equal('There is a problem')
  const errorMessage = await enterName.getFirstNameError()
  expect(errorMessage).to.be.equal('Enter a shorter first or given name')
})
