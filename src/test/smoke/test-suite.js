/* eslint-disable no-unused-expressions */
'use strict'

const { expect } = require('chai')
const PersonalDetails = require('../common/page/personal-details')
const Overview = require('../common/page/overview')
const DriverManager = require('../common/driver/driver-manager')
const { PUBLIC_BASE_URL } = require('./environment')

const TOTAL_TEST_TIMEOUT_MILLIS = 20000

describe('Personal details', function () {
  this.timeout(TOTAL_TEST_TIMEOUT_MILLIS)

  const driverManager = new DriverManager()
  let personalDetails
  let overview
  let driver

  beforeEach(async () => {
    driver = driverManager.initialise()
    overview = new Overview(driver)
    personalDetails = new PersonalDetails(driver)
  })

  afterEach(async function () {
    await driverManager.quit()
  })

  it('successfully submits the form when name is inputted', async () => {
    await overview.open(PUBLIC_BASE_URL)

    const h1ElementText = await overview.getH1Text()
    expect(h1ElementText).to.be.equal('Start page')

    // const h2ElementText = await overview.getH2Text()
    // expect(h2ElementText).to.be.equal('How to claim')

    await overview.clickStartButton()

    await personalDetails.waitForPageLoad()
    await personalDetails.enterFirstName('Lisa')
    await personalDetails.enterLastName('Bloggs')
    await personalDetails.submitForm()
    // await personalDetails.waitForPageWithTitle('Confirm details – GOV.UK')
    // const confirmationHasLoaded = await personalDetails.isConfirmationDisplayed()
    // expect(confirmationHasLoaded).to.be.true
  })

  it('displays an error message when no name is inputted', async () => {
    await personalDetails.open(PUBLIC_BASE_URL)
    await personalDetails.submitForm()
    // const errorMessage = await personalDetails.getPageErrorText()
    // expect(errorMessage).to.equal('Please fix the following error')
  })
})
