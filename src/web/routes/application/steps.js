const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { enterDob } = require('./enter-dob')
const { areYouPregnant } = require('./are-you-pregnant')

const steps = [
  enterNino,
  enterName,
  enterDob,
  areYouPregnant
]

module.exports = { steps }
