const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { enterDob } = require('./enter-dob')
const { areYouPregnant } = require('./are-you-pregnant')
const { cardAddress } = require('./card-address')

const steps = [
  enterDob,
  areYouPregnant,
  enterName,
  enterNino,
  cardAddress
]

module.exports = { steps }
