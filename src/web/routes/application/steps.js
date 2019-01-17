const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')

const steps = [
  enterNino,
  enterName
]

module.exports = { steps }
