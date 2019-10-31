const { nationalInsuranceNumber } = require('./steps/national-insurance-number')
const { name } = require('./steps/name')
const { dateOfBirth } = require('./steps/date-of-birth')
const { areYouPregnant } = require('./steps/are-you-pregnant')
const { manualAddress } = require('./steps/address/manual-address')
const { phoneNumber } = require('./steps/phone-number')
const { scotland } = require('./steps/scotland')
const { inScotland } = require('./steps/in-scotland')
const { emailAddress } = require('./steps/email-address')
const { doYouHaveChildren } = require('./steps/do-you-have-children')
const { childDateOfBirth } = require('./steps/child-date-of-birth')
const { sendCode } = require('./steps/send-code')
const { enterCode } = require('./steps/enter-code')
const { postcode } = require('./steps/address/postcode')
const { selectAddress } = require('./steps/address/select-address')

const APPLY = {
  steps: [
    scotland,
    inScotland,
    dateOfBirth,
    doYouHaveChildren,
    childDateOfBirth,
    areYouPregnant,
    name,
    nationalInsuranceNumber,
    postcode,
    selectAddress,
    manualAddress,
    phoneNumber,
    emailAddress,
    sendCode,
    enterCode
  ]
}

// TODO do not add new user journeys until all stories in "Support Multiple User
// Journeys in Web UI" epic (HTBHF-2515) are complete
module.exports.JOURNEYS = [APPLY]
