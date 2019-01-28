/* no-process-exit */
'use strict'

const { getSIDCookieAndCSRFToken, postFormData } = require('./request')
const pa11yWithSettings = require('./pally')
const handleTestResults = require('./results')
const IGNORE_RULES = require('./ignore-rules')
const { PORT } = require('../common/config')

const BASE_URL = `http://localhost:${PORT}`
const ENTER_NAME_URL = `${BASE_URL}/enter-name`
const ENTER_NINO_URL = `${BASE_URL}/enter-nino`
const ENTER_DOB_URL = `${BASE_URL}/enter-dob`
const ARE_YOU_PREGNANT_URL = `${BASE_URL}/are-you-pregnant`
const CHECK_URL = `${BASE_URL}/check`
const CONFIRM_URL = `${BASE_URL}/confirm`

/*
  Runs though the application, evaluating each page and performing post requests to populate the necessary
  data in the database.
 */
const runTests = async () => {
  try {
    let results = []
    const { requestCookie, csrfToken } = await getSIDCookieAndCSRFToken(ENTER_NAME_URL)
    const pa11y = pa11yWithSettings(IGNORE_RULES, { Cookie: requestCookie })
    const formData = { '_csrf': csrfToken }

    results.push(await pa11y(ENTER_NAME_URL))
    await postFormData(ENTER_NAME_URL, { ...formData, lastName: 'Lisa' }, requestCookie)

    results.push(await pa11y(ENTER_NINO_URL))
    await postFormData(ENTER_NINO_URL, { ...formData, nino: 'QQ123456C' }, requestCookie)

    results.push(await pa11y(ENTER_DOB_URL))
    await postFormData(ENTER_DOB_URL, {
      ...formData,
      'dob-day': '1',
      'dob-month': '10',
      'dob-year': '1980'
    }, requestCookie)

    results.push(await pa11y(ARE_YOU_PREGNANT_URL))
    await postFormData(ARE_YOU_PREGNANT_URL, formData, requestCookie)

    results.push(await pa11y(CHECK_URL))
    await postFormData(CHECK_URL, formData, requestCookie)

    results.push(await pa11y(CONFIRM_URL))

    handleTestResults(results)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runTests()
