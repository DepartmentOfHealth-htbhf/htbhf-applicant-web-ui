const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { enterDob } = require('./enter-dob')
const { areYouPregnant } = require('./are-you-pregnant')
const { cardAddress } = require('./card-address')
const { phoneNumber } = require('./phone-number')
const { doYouLiveInScotland } = require('./do-you-live-in-scotland')
const { iLiveInScotland } = require('./i-live-in-scotland')
const { emailAddress } = require('./email-address')
const { doYouHaveChildrenThreeOrUnder } = require('./do-you-have-children-three-or-under')

const steps = [
  doYouLiveInScotland,
  iLiveInScotland,
  enterDob,
  doYouHaveChildrenThreeOrUnder,
  areYouPregnant,
  enterName,
  enterNino,
  cardAddress,
  phoneNumber,
  emailAddress
]

module.exports = { steps }
