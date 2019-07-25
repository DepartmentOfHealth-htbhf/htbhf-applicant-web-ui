const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { enterDob } = require('./enter-dob')
const { areYouPregnant } = require('./are-you-pregnant')
const { manualAddress } = require('./manual-address')
const { phoneNumber } = require('./phone-number')
const { doYouLiveInScotland } = require('./do-you-live-in-scotland')
const { iLiveInScotland } = require('./i-live-in-scotland')
const { emailAddress } = require('./email-address')
const { doYouHaveChildren } = require('./do-you-have-children')
const { childrenDob } = require('./children-dob')
const { sendCode } = require('./send-code')
const { enterCode } = require('./enter-code')

const steps = [
  doYouLiveInScotland,
  iLiveInScotland,
  enterDob,
  doYouHaveChildren,
  childrenDob,
  areYouPregnant,
  enterName,
  enterNino,
  manualAddress,
  phoneNumber,
  emailAddress,
  sendCode,
  enterCode
]

module.exports = { steps }
