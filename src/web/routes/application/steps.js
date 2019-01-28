const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { enterDob } = require('./enter-dob')
const { areYouPregnant } = require('./are-you-pregnant')
const { cardAddress } = require('./card-address')

const steps = [
  enterNino,
  enterName,
  enterDob,
  areYouPregnant,
  cardAddress
]

module.exports = { steps }
