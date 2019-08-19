const {
  enterNameAndSubmit,
  enterNinoAndSubmit,
  enterDateOfBirthAndSubmit,
  selectNoOnPregnancyPage,
  selectYesOnPregnancyPage,
  enterManualAddressAndSubmit,
  enterPhoneNumberAndSubmit,
  enterDoYouLiveInScotlandNoAndSubmit,
  enterEmailAddressAndSubmit,
  selectYesOnDoYouHaveChildrenPage,
  submitChild3OrUnderDetails,
  selectTextOnSendCode,
  enterConfirmationCodeAndSubmit
} = require('../common-steps')

const STEP_PAGE_ACTIONS = [
  {
    page: (pages) => pages.doYouLiveInScotland,
    actions: async () => enterDoYouLiveInScotlandNoAndSubmit()
  },
  {
    page: (pages) => pages.enterDOB,
    actions: async () => enterDateOfBirthAndSubmit()
  },
  {
    page: (pages) => pages.doYouHaveChildren,
    actions: async () => selectYesOnDoYouHaveChildrenPage()
  },
  {
    page: (pages) => pages.enterChildrenDOB,
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
    page: (pages) => pages.enterName,
    actions: async (actionOptions) => enterNameAndSubmit(actionOptions.firstName, actionOptions.lastName)
  },
  {
    page: (pages) => pages.enterNino,
    actions: async () => enterNinoAndSubmit()
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
    page: (pages) => pages.check
  }
]

module.exports = {
  STEP_PAGE_ACTIONS
}
