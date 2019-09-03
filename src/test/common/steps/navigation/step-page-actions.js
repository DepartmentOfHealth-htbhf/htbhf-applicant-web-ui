const {
  enterNameAndSubmit,
  enterNinoAndSubmit,
  enterDateOfBirthAndSubmit,
  selectNoOnPregnancyPage,
  selectYesOnPregnancyPage,
  enterPostcodeAndSubmit,
  clickAddressNotListedLink,
  enterManualAddressAndSubmit,
  enterPhoneNumberAndSubmit,
  enterDoYouLiveInScotlandNoAndSubmit,
  enterEmailAddressAndSubmit,
  selectYesOnDoYouHaveChildrenPage,
  submitChild3OrUnderDetails,
  selectTextOnSendCode,
  enterConfirmationCodeAndSubmit
} = require('../common-steps')

const { POSTCODE } = require('../constants')
const { setupPostcodeLookupWithResults } = require('../../wiremock/postcode-lookup')

const STEP_PAGE_ACTIONS = [
  {
    page: (pages) => pages.scotland,
    actions: async () => enterDoYouLiveInScotlandNoAndSubmit()
  },
  {
    page: (pages) => pages.dateOfBirth,
    actions: async () => enterDateOfBirthAndSubmit()
  },
  {
    page: (pages) => pages.doYouHaveChildren,
    actions: async () => selectYesOnDoYouHaveChildrenPage()
  },
  {
    page: (pages) => pages.childDateOfBirth,
    actions: async () => submitChild3OrUnderDetails()
  },
  {
    page: (pages) => pages.areYouPregnant,
    actions: async (actionOptions) =>
      actionOptions.isClaimantPregnant
        ? selectYesOnPregnancyPage()
        : selectNoOnPregnancyPage()
  },
  {
    page: (pages) => pages.name,
    actions: async (actionOptions) => enterNameAndSubmit(actionOptions.firstName, actionOptions.lastName)
  },
  {
    page: (pages) => pages.nationalInsuranceNumber,
    actions: async () => enterNinoAndSubmit()
  },
  {
    page: (pages) => pages.postcode,
    actions: async () => {
      await setupPostcodeLookupWithResults(POSTCODE)
      await enterPostcodeAndSubmit()
    },
    toggle: 'ADDRESS_LOOKUP_ENABLED'
  },
  {
    page: (pages) => pages.selectAddress,
    actions: async () => clickAddressNotListedLink(),
    toggle: 'ADDRESS_LOOKUP_ENABLED'
  },
  {
    page: (pages) => pages.manualAddress,
    actions: async (actionOptions) =>
      enterManualAddressAndSubmit(actionOptions.addressLine1, actionOptions.addressLine2, actionOptions.townOrCity, actionOptions.county, actionOptions.postcode)
  },
  {
    page: (pages) => pages.phoneNumber,
    actions: async () => enterPhoneNumberAndSubmit()
  },
  {
    page: (pages) => pages.emailAddress,
    actions: async () => enterEmailAddressAndSubmit()
  },
  {
    page: (pages) => pages.sendCode,
    actions: async () => selectTextOnSendCode()
  },
  {
    page: (pages) => pages.enterCode,
    actions: async () => enterConfirmationCodeAndSubmit()
  },
  {
    page: (pages) => pages.checkAnswers
  }
]

module.exports = {
  STEP_PAGE_ACTIONS
}
