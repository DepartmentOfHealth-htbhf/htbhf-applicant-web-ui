const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { enterDob } = require('./enter-dob')
const { areYouPregnant } = require('./are-you-pregnant')
const { cardAddress } = require('./card-address')
const { phoneNumber } = require('./phone-number')
const { doYouLiveInScotland } = require('./do-you-live-in-scotland')
const { iLiveInScotland } = require('./i-live-in-scotland')
const { emailAddress } = require('./email-address')
const { doYouHaveChildrenThreeOrYounger } = require('./do-you-have-children-three-or-younger')
const { childrenDob } = require('./children-dob')
const { chooseChannelForCode } = require('./choose-channel-for-code')

const steps = [
  doYouLiveInScotland,
  iLiveInScotland,
  enterDob,
  doYouHaveChildrenThreeOrYounger,
  childrenDob,
  areYouPregnant,
  enterName,
  enterNino,
  cardAddress,
  phoneNumber,
  emailAddress,
  chooseChannelForCode
]

module.exports = { steps }
