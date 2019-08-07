/* no-process-exit */
'use strict'
require('dotenv')
const { getSIDCookieAndCSRFToken, postFormData, get } = require('../common/request')
const { dateIn3Months, dateLastYear } = require('../common/dates')
const pa11yWithSettings = require('./pally')
const handleTestResults = require('./results')
const { VALID_ELIGIBLE_NINO, PHONE_NUMBER, EMAIL_ADDRESS, TEXT } = require('../common/steps/constants')
const IGNORE_RULES = require('./ignore-rules')
const { PORT, SESSION_CONFIRMATION_CODE_URL } = require('../common/config')
const APP_BASE_URL = process.env.APP_BASE_URL || ''

const BASE_URL = APP_BASE_URL === '' ? `http://localhost:${PORT}` : `${APP_BASE_URL}`
const DO_YOU_LIVE_IN_SCOTLAND_URL = `${BASE_URL}/do-you-live-in-scotland`
const I_LIVE_IN_SCOTLAND_URL = `${BASE_URL}/i-live-in-scotland`
const ENTER_NAME_URL = `${BASE_URL}/enter-name`
const ENTER_NINO_URL = `${BASE_URL}/enter-nino`
const ENTER_DOB_URL = `${BASE_URL}/enter-dob`
const DO_YOU_HAVE_CHILDREN_URL = `${BASE_URL}/do-you-have-children`
const CHILDREN_DOB_URL = `${BASE_URL}/children-dob`
const ARE_YOU_PREGNANT_URL = `${BASE_URL}/are-you-pregnant`
const MANUAL_ADDRESS_URL = `${BASE_URL}/manual-address`
const PHONE_NUMBER_URL = `${BASE_URL}/phone-number`
const EMAIL_ADDRESS_URL = `${BASE_URL}/email-address`
const CHECK_URL = `${BASE_URL}/check`
const SEND_CODE_URL = `${BASE_URL}/send-code`
const ENTER_CODE_URL = `${BASE_URL}/enter-code`
const TERMS_AND_CONDITIONS_URL = `${BASE_URL}/terms-and-conditions`
const CONFIRM_URL = `${BASE_URL}/confirm`
const APPLICATION_COMPLETE_TITLE = 'GOV.UK - Application complete'

const HOW_IT_WORKS_URL = `${BASE_URL}/`
const ELIGIBILITY_URL = `${BASE_URL}/eligibility`
const WHAT_YOU_GET_URL = `${BASE_URL}/what-you-get`
const WHAT_YOU_CAN_BUY_URL = `${BASE_URL}/buy`
const USING_YOUR_CARD_URL = `${BASE_URL}/using-your-card`
const APPLY_URL = `${BASE_URL}/apply`
const REPORT_A_CHANGE_URL = `${BASE_URL}/report-a-change`

/*
  Runs though the application, evaluating each page and performing post requests to populate the necessary
  data in the database.
 */
const runEndToEndTest = async (results) => {
  try {
    const { requestCookie, csrfToken } = await getSIDCookieAndCSRFToken(DO_YOU_LIVE_IN_SCOTLAND_URL)
    const pa11y = pa11yWithSettings(IGNORE_RULES, { Cookie: requestCookie })
    const formData = { '_csrf': csrfToken }

    console.log('Testing', DO_YOU_LIVE_IN_SCOTLAND_URL)
    results.push(await pa11y(DO_YOU_LIVE_IN_SCOTLAND_URL))
    await postFormData(DO_YOU_LIVE_IN_SCOTLAND_URL, { ...formData, doYouLiveInScotland: 'no' }, requestCookie)

    console.log('Testing', ENTER_DOB_URL)
    results.push(await pa11y(ENTER_DOB_URL))
    await postFormData(ENTER_DOB_URL, {
      ...formData,
      'dateOfBirth-day': '1',
      'dateOfBirth-month': '10',
      'dateOfBirth-year': '1980'
    }, requestCookie)

    console.log('Testing', DO_YOU_HAVE_CHILDREN_URL)
    results.push(await pa11y(DO_YOU_HAVE_CHILDREN_URL))
    await postFormData(DO_YOU_HAVE_CHILDREN_URL, {
      ...formData,
      doYouHaveChildren: 'yes'
    }, requestCookie)

    console.log('Testing', CHILDREN_DOB_URL)
    results.push(await pa11y(CHILDREN_DOB_URL))
    const childDob = dateLastYear()
    await postFormData(CHILDREN_DOB_URL, {
      ...formData,
      'childName-1': 'Bart',
      'childDob-1-day': childDob.getDate(),
      'childDob-1-month': childDob.getMonth() + 1,
      'childDob-1-year': childDob.getFullYear()
    }, requestCookie)

    console.log('Testing', ARE_YOU_PREGNANT_URL)
    results.push(await pa11y(ARE_YOU_PREGNANT_URL))
    const dueDate = dateIn3Months()
    await postFormData(ARE_YOU_PREGNANT_URL, {
      ...formData,
      areYouPregnant: 'yes',
      'expectedDeliveryDate-day': dueDate.getDate(),
      'expectedDeliveryDate-month': dueDate.getMonth() + 1,
      'expectedDeliveryDate-year': dueDate.getFullYear()
    }, requestCookie)

    console.log('Testing', ENTER_NAME_URL)
    results.push(await pa11y(ENTER_NAME_URL))
    await postFormData(ENTER_NAME_URL, { ...formData, firstName: 'Lisa', lastName: 'Simpson' }, requestCookie)

    console.log('Testing', ENTER_NINO_URL)
    results.push(await pa11y(ENTER_NINO_URL))
    await postFormData(ENTER_NINO_URL, { ...formData, nino: VALID_ELIGIBLE_NINO }, requestCookie)

    console.log('Testing', MANUAL_ADDRESS_URL)
    results.push(await pa11y(MANUAL_ADDRESS_URL))
    await postFormData(MANUAL_ADDRESS_URL, {
      ...formData,
      'addressLine1': 'Flat B',
      'addressLine2': 'Baker Street',
      'townOrCity': 'London',
      'county': 'Greater London',
      'postcode': 'AA1 1AA'
    }, requestCookie)

    console.log('Testing', PHONE_NUMBER_URL)
    results.push(await pa11y(PHONE_NUMBER_URL))
    await postFormData(PHONE_NUMBER_URL, { ...formData, phoneNumber: PHONE_NUMBER }, requestCookie)

    console.log('Testing', EMAIL_ADDRESS_URL)
    results.push(await pa11y(EMAIL_ADDRESS_URL))
    await postFormData(EMAIL_ADDRESS_URL, { ...formData, emailAddress: EMAIL_ADDRESS }, requestCookie)

    console.log('Testing', SEND_CODE_URL)
    results.push(await pa11y(SEND_CODE_URL))
    await postFormData(SEND_CODE_URL, { ...formData, channelForCode: TEXT }, requestCookie)

    console.log('Getting confirmation code from', SESSION_CONFIRMATION_CODE_URL)
    const confirmationCode = await get(SESSION_CONFIRMATION_CODE_URL, requestCookie)

    console.log('Testing', ENTER_CODE_URL)
    results.push(await pa11y(ENTER_CODE_URL))
    await postFormData(ENTER_CODE_URL, { ...formData, confirmationCode }, requestCookie)

    console.log('Testing', CHECK_URL)
    results.push(await pa11y(CHECK_URL))

    console.log('Testing', TERMS_AND_CONDITIONS_URL)
    results.push(await pa11y(TERMS_AND_CONDITIONS_URL))
    await postFormData(TERMS_AND_CONDITIONS_URL, { ...formData, agree: 'agree' }, requestCookie)

    console.log('Testing', CONFIRM_URL)
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
    const { requestCookie, csrfToken } = await getSIDCookieAndCSRFToken(DO_YOU_LIVE_IN_SCOTLAND_URL)
    const pa11y = pa11yWithSettings(IGNORE_RULES, { Cookie: requestCookie })
    const formData = { '_csrf': csrfToken }

    console.log('Scotland testing', DO_YOU_LIVE_IN_SCOTLAND_URL)
    results.push(await pa11y(DO_YOU_LIVE_IN_SCOTLAND_URL))
    await postFormData(DO_YOU_LIVE_IN_SCOTLAND_URL, { ...formData, doYouLiveInScotland: 'yes' }, requestCookie)

    console.log('Scotland testing', I_LIVE_IN_SCOTLAND_URL)
    results.push(await pa11y(I_LIVE_IN_SCOTLAND_URL))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const runGuidancePageTest = async (results) => {
  try {
    const { requestCookie } = await getSIDCookieAndCSRFToken(DO_YOU_LIVE_IN_SCOTLAND_URL)
    const pa11y = pa11yWithSettings(IGNORE_RULES, { Cookie: requestCookie })

    results.push(await pa11y(HOW_IT_WORKS_URL))
    results.push(await pa11y(ELIGIBILITY_URL))
    results.push(await pa11y(WHAT_YOU_GET_URL))
    results.push(await pa11y(WHAT_YOU_CAN_BUY_URL))
    results.push(await pa11y(USING_YOUR_CARD_URL))
    results.push(await pa11y(APPLY_URL))
    results.push(await pa11y(REPORT_A_CHANGE_URL))
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
    await runGuidancePageTest(results)
    handleTestResults(results)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = { runAllTests }
