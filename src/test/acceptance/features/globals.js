const EnterName = require('../../common/page/enter-name')
const Overview = require('../../common/page/overview')
const Confirmation = require('../../common/page/confirmation')
const DriverManager = require('../../common/driver/driver-manager')

const driverManager = new DriverManager()

class Globals {
  constructor () {
    this.driver = null
    this.overview = null
    this.enterName = null
    this.confirmation = null
  }

  initialise () {
    this.driver = driverManager.initialise()
    this.overview = new Overview(this.driver)
    this.enterName = new EnterName(this.driver)
    this.confirmation = new Confirmation(this.driver)
  }
}

module.exports = new Globals()
