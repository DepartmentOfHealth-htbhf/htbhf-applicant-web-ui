const {
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
} = require('./steps')

const APPLY = {
  name: 'apply',
  endpoint: '/v2/claims',
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
