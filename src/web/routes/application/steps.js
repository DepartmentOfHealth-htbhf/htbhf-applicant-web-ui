const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { enterDob } = require('./enter-dob')
const { areYouPregnant } = require('./are-you-pregnant')
const { cardAddress } = require('./card-address')
const { phoneNumber } = require('./phone-number')

const steps = [
  enterName,
  enterNino,
  enterDob,
  areYouPregnant,
  cardAddress,
  phoneNumber
]

module.exports = { steps }
