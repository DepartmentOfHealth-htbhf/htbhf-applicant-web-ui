/* no-process-exit */
'use strict'
require('dotenv')
const { getSIDCookieAndCSRFToken, postFormData } = require('../common/request')
const pa11yWithSettings = require('./pally')
const handleTestResults = require('./results')
const { VALID_ELIGIBLE_NINO, PHONE_NUMBER, EMAIL_ADDRESS } = require('../common/steps/constants')
const IGNORE_RULES = require('./ignore-rules')
const { PORT } = require('../common/config')
const APP_BASE_URL = process.env.APP_BASE_URL || ''

const BASE_URL = APP_BASE_URL === '' ? `http://localhost:${PORT}` : `${APP_BASE_URL}`
const DO_YOU_LIVE_IN_SCOTLAND_URL = `${BASE_URL}/do-you-live-in-scotland`
const I_LIVE_IN_SCOTLAND_URL = `${BASE_URL}/i-live-in-scotland`
const ENTER_NAME_URL = `${BASE_URL}/enter-name`
const ENTER_NINO_URL = `${BASE_URL}/enter-nino`
const ENTER_DOB_URL = `${BASE_URL}/enter-dob`
const ARE_YOU_PREGNANT_URL = `${BASE_URL}/are-you-pregnant`
const CARD_ADDRESS_URL = `${BASE_URL}/card-address`
const PHONE_NUMBER_URL = `${BASE_URL}/phone-number`
const EMAIL_ADDRESS_URL = `${BASE_URL}/email-address`
const CHECK_URL = `${BASE_URL}/check`
const TERMS_AND_CONDITIONS_URL = `${BASE_URL}/terms-and-conditions`
const CONFIRM_URL = `${BASE_URL}/confirm`
const APPLICATION_COMPLETE_TITLE = 'GOV.UK - Application complete'

const dateIn3Months = () => {
  const dueDate = new Date()
  dueDate.setDate(1)
  dueDate.setMonth(dueDate.getMonth() + 3)
  return dueDate
}

/*
  Runs though the application, evaluating each page and performing post requests to populate the necessary
  data in the database.
 */
const runEndToEndTest = async (results) => {
  try {
    const { requestCookie, csrfToken } = await getSIDCookieAndCSRFToken(ENTER_DOB_URL)
    const pa11y = pa11yWithSettings(IGNORE_RULES, { Cookie: requestCookie })
    const formData = { '_csrf': csrfToken }

    results.push(await pa11y(DO_YOU_LIVE_IN_SCOTLAND_URL))
    await postFormData(DO_YOU_LIVE_IN_SCOTLAND_URL, { ...formData, doYouLiveInScotland: 'no' }, requestCookie)

    results.push(await pa11y(ENTER_DOB_URL))
    await postFormData(ENTER_DOB_URL, {
      ...formData,
      'dateOfBirth-day': '1',
      'dateOfBirth-month': '10',
      'dateOfBirth-year': '1980'
    }, requestCookie)

    results.push(await pa11y(ARE_YOU_PREGNANT_URL))
    const dueDate = dateIn3Months()
    await postFormData(ARE_YOU_PREGNANT_URL, {
      ...formData,
      areYouPregnant: 'yes',
      'expectedDeliveryDate-day': dueDate.getDate(),
      'expectedDeliveryDate-month': dueDate.getMonth() + 1,
      'expectedDeliveryDate-year': dueDate.getFullYear()
    }, requestCookie)

    results.push(await pa11y(ENTER_NAME_URL))
    await postFormData(ENTER_NAME_URL, { ...formData, firstName: 'Lisa', lastName: 'Simpson' }, requestCookie)

    results.push(await pa11y(ENTER_NINO_URL))
    await postFormData(ENTER_NINO_URL, { ...formData, nino: VALID_ELIGIBLE_NINO }, requestCookie)

    results.push(await pa11y(CARD_ADDRESS_URL))
    await postFormData(CARD_ADDRESS_URL, {
      ...formData,
      'addressLine1': 'Flat B',
      'addressLine2': 'Baker Street',
      'townOrCity': 'London',
      'postcode': 'AA1 1AA'
    }, requestCookie)

    results.push(await pa11y(PHONE_NUMBER_URL))
    await postFormData(PHONE_NUMBER_URL, { ...formData, phoneNumber: PHONE_NUMBER }, requestCookie)

    results.push(await pa11y(EMAIL_ADDRESS_URL))
    await postFormData(EMAIL_ADDRESS_URL, { ...formData, emailAddress: EMAIL_ADDRESS }, requestCookie)

    results.push(await pa11y(CHECK_URL))

    results.push(await pa11y(TERMS_AND_CONDITIONS_URL))
    await postFormData(TERMS_AND_CONDITIONS_URL, { ...formData, agree: 'agree' }, requestCookie)

    const confirmResult = await pa11y(CONFIRM_URL)
    if (confirmResult.documentTitle !== APPLICATION_COMPLETE_TITLE) {
      confirmResult.issues.push(`Expected title to be ${APPLICATION_COMPLETE_TITLE}, instead got ${confirmResult.documentTitle}`)
    }
    results.push(confirmResult)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const runILiveInScotlandTest = async (results) => {
  try {
    const { requestCookie, csrfToken } = await getSIDCookieAndCSRFToken(ENTER_DOB_URL)
    const pa11y = pa11yWithSettings(IGNORE_RULES, { Cookie: requestCookie })
    const formData = { '_csrf': csrfToken }

    results.push(await pa11y(DO_YOU_LIVE_IN_SCOTLAND_URL))
    await postFormData(DO_YOU_LIVE_IN_SCOTLAND_URL, { ...formData, doYouLiveInScotland: 'yes' }, requestCookie)

    results.push(await pa11y(I_LIVE_IN_SCOTLAND_URL))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const runAllTests = async () => {
  try {
    let results = []
    console.log(`Running accessibility tests against ${BASE_URL}`)
    await runEndToEndTest(results)
    await runILiveInScotlandTest(results)
    handleTestResults(results)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = { runAllTests }
