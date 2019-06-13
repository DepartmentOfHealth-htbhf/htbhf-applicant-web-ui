const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { enterDob } = require('./enter-dob')
const { areYouPregnant } = require('./are-you-pregnant')
const { cardAddress } = require('./card-address')
const { phoneNumber } = require('./phone-number')
const { doYouLiveInScotland } = require('./do-you-live-in-scotland')

const steps = [
  doYouLiveInScotland,
  enterDob,
  areYouPregnant,
  enterName,
  enterNino,
  cardAddress,
  phoneNumber
]

module.exports = { steps }
