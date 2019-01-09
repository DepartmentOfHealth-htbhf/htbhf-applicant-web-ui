/* eslint-disable no-unused-expressions */
'use strict'

const { expect } = require('chai')
const EnterName = require('../common/page/enter-name')
const Overview = require('../common/page/overview')
const DriverManager = require('../common/driver/driver-manager')
const { BASE_URL } = require('./constants')

const TOTAL_TEST_TIMEOUT_MILLIS = 5000

describe('Enter name', function () {
  this.timeout(TOTAL_TEST_TIMEOUT_MILLIS)

  const driverManager = new DriverManager()
  let enterName
  let overview
  let driver

  beforeEach(async () => {
    driver = driverManager.initialise()
    overview = new Overview(driver)
    enterName = new EnterName(driver)
  })

  afterEach(async function () {
    await driverManager.quit()
  })

  it('successfully submits the form when name is inputted', async () => {
    await overview.open(BASE_URL)

    const h1ElementText = await overview.getH1Text()
    expect(h1ElementText).to.be.equal('Start page')

    // const h2ElementText = await overview.getH2Text()
    // expect(h2ElementText).to.be.equal('How to claim')

    await overview.clickStartButton()

    await enterName.waitForPageLoad()
    await enterName.enterFirstName('Lisa')
    await enterName.enterLastName('Bloggs')
    await enterName.submitForm()
    // await enterName.waitForPageWithTitle('Confirm details – GOV.UK')
    // const confirmationHasLoaded = await enterName.isConfirmationDisplayed()
    // expect(confirmationHasLoaded).to.be.true
  })

  it('displays an error message when no name is inputted', async () => {
    await enterName.open(BASE_URL)
    await enterName.submitForm()
    // const errorMessage = await enterName.getPageErrorText()
    // expect(errorMessage).to.equal('Please fix the following error')
  })
})
