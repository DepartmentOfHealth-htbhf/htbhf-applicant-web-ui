const { registerJourneys } = require('./register-journeys')
const { JOURNEYS } = require('./journey-definitions')

module.exports = {
  registerJourneys: registerJourneys(JOURNEYS)
}
