const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { enterDob } = require('./enter-dob')

const steps = [
  enterNino,
  enterName,
  enterDob
]

module.exports = { steps }
