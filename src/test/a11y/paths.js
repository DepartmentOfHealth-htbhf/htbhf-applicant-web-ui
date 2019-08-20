require('dotenv')
const { PORT } = require('../common/config')

const APP_BASE_URL = process.env.APP_BASE_URL || ''
const BASE_URL = APP_BASE_URL === '' ? `http://localhost:${PORT}` : APP_BASE_URL

const URLS = {
  DO_YOU_LIVE_IN_SCOTLAND: `${BASE_URL}/scotland`,
  I_LIVE_IN_SCOTLAND: `${BASE_URL}/in-scotland`,
  ENTER_NAME: `${BASE_URL}/enter-name`,
  ENTER_NINO: `${BASE_URL}/enter-nino`,
  ENTER_DOB: `${BASE_URL}/date-of-birth`,
  DO_YOU_HAVE_CHILDREN: `${BASE_URL}/do-you-have-children`,
  CHILDREN_DOB: `${BASE_URL}/children-dob`,
  ARE_YOU_PREGNANT: `${BASE_URL}/are-you-pregnant`,
  POSTCODE: `${BASE_URL}/postcode`,
  SELECT_ADDRESS: `${BASE_URL}/select-address`,
  MANUAL_ADDRESS: `${BASE_URL}/manual-address`,
  PHONE_NUMBER: `${BASE_URL}/phone-number`,
  EMAIL_ADDRESS: `${BASE_URL}/email-address`,
  CHECK: `${BASE_URL}/check`,
  SEND_CODE: `${BASE_URL}/send-code`,
  ENTER_CODE: `${BASE_URL}/enter-code`,
  TERMS_AND_CONDITIONS: `${BASE_URL}/terms-and-conditions`,
  CONFIRM: `${BASE_URL}/confirm`,
  HOW_IT_WORKS: `${BASE_URL}/`,
  ELIGIBILITY: `${BASE_URL}/eligibility`,
  WHAT_YOU_GET: `${BASE_URL}/what-you-get`,
  WHAT_YOU_CAN_BUY: `${BASE_URL}/buy`,
  USING_YOUR_CARD: `${BASE_URL}/using-your-card`,
  APPLY: `${BASE_URL}/apply`,
  REPORT_A_CHANGE: `${BASE_URL}/report-a-change`
}

module.exports = {
  BASE_URL,
  URLS
}
