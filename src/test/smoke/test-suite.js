/* eslint-disable no-unused-expressions */
'use strict'

const { expect } = require('chai')
const EnterName = require('../common/page/enter-name')
const Overview = require('../common/page/overview')
const DriverManager = require('../common/driver/driver-manager')
const { PUBLIC_BASE_URL } = require('./environment')

const TOTAL_TEST_TIMEOUT_MILLIS = 20000

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

  it('successfully displays the enter name page', async () => {
    await overview.open(PUBLIC_BASE_URL)

    const h1ElementText = await overview.getH1Text()
    expect(h1ElementText).to.be.equal('Overview')

    // const h2ElementText = await overview.getH2Text()
    // expect(h2ElementText).to.be.equal('How to claim')

    await overview.clickStartButton()

    await enterName.waitForPageLoad()
  })
})
