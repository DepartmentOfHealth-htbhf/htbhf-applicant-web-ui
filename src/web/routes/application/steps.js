const { enterNino } = require('./enter-nino')
const { enterName } = require('./enter-name')
const { dateOfBirth } = require('./date-of-birth')
const { areYouPregnant } = require('./are-you-pregnant')
const { manualAddress } = require('./manual-address')
const { phoneNumber } = require('./phone-number')
const { scotland } = require('./scotland')
const { inScotland } = require('./in-scotland')
const { emailAddress } = require('./email-address')
const { doYouHaveChildren } = require('./do-you-have-children')
const { childDateOfBirth } = require('./child-date-of-birth')
const { sendCode } = require('./send-code')
const { enterCode } = require('./enter-code')
const { postcode } = require('./postcode')

const steps = [
  scotland,
  inScotland,
  dateOfBirth,
  doYouHaveChildren,
  childDateOfBirth,
  areYouPregnant,
  enterName,
  enterNino,
  postcode,
  manualAddress,
  phoneNumber,
  emailAddress,
  sendCode,
  enterCode
]

module.exports = { steps }
