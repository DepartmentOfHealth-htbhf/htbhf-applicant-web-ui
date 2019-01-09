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

  it('successfully displays the personal details page', async () => {
    await overview.open(PUBLIC_BASE_URL)

    const h1ElementText = await overview.getH1Text()
    expect(h1ElementText).to.be.equal('Start page')

    // const h2ElementText = await overview.getH2Text()
    // expect(h2ElementText).to.be.equal('How to claim')

    await overview.clickStartButton()

    await personalDetails.waitForPageLoad()
  })
})
