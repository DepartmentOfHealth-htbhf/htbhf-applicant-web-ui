const {
  nhsNumber,
  nhsNumberUpdate,
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
  endpoint: '/v3/claims',
  steps: [
    nhsNumber,
    nhsNumberUpdate,
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

const TESTJOURNEY = {
  name: 'testUpdate',
  pathPrefix: '/test',
  endpoint: '/v3/claims',
  steps: [
    nhsNumber,
    name,
    dateOfBirth,
    nhsNumberUpdate,
  ]
}

module.exports.JOURNEYS = [APPLY, TESTJOURNEY]

