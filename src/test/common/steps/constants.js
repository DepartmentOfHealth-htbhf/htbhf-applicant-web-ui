const { dateLastYear } = require('../../common/dates')
const { formatDateForDisplayFromDate } = require('../../../web/routes/application/common/formatters')

// Create a string 501 characters long
const LONG_STRING = new Array(502).join('A')
const BLANK_STRING = ''
const YES_LABEL = 'Yes'
const NO_LABEL = 'No'
const TEXT_LABEL = 'Text'
const EMAIL_LABEL = 'Email'
const TEXT = 'text'
const EMAIL = 'email'

function randomCharFromChars (chars) {
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

/**
 * Generates a two character string where one character is always `E` to ensure an eligible
 * response is returned when mapping NINO to smart stub application
 */
function randomEligibleTwoChars () {
  const randomChar = randomCharFromChars('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  return Math.random() < 0.5 ? `${randomChar}E` : `E${randomChar}`
}

/**
 * Generates a random character from A, B or C. D is not included as this is used
 * by performance tests.
 */
function randomCharAtoC () {
  return randomCharFromChars('ABC')
}

function randomFourDigitInteger () {
  const number = Math.floor((Math.random() * (9999)) + 1)
  return number.toString().padStart(4, '0')
}

/**
 * Generates an eligible NINO which always has one child under one and one child between one and four
 * when mapping NINO to smart stub application
 */
function generateEligibleNino () {
  return `${randomEligibleTwoChars()}12${randomFourDigitInteger()}${randomCharAtoC()}`
}

// use a random nino for each test run to prevent duplication errors during compatibility and accessibility tests.
const VALID_ELIGIBLE_NINO = generateEligibleNino()
const DAY = '30'
const MONTH = '12'
const YEAR = '1980'
const DATE_OF_BIRTH = `${DAY} December ${YEAR}`
const FIRST_NAME = 'Lisa'
const LAST_NAME = 'Simpson'
const FULL_NAME = `${FIRST_NAME} ${LAST_NAME}`
const ADDRESS_LINE_1 = 'Flat b'
const ADDRESS_LINE_2 = '123 Fake street'
const TOWN = 'Springfield'
const COUNTY = 'Devon'
const POSTCODE = 'AA11BB'
const FULL_ADDRESS = `${ADDRESS_LINE_1}\n${ADDRESS_LINE_2}\n${TOWN}\n${COUNTY}\n${POSTCODE}`
const FULL_ADDRESS_NO_LINE_2 = `${ADDRESS_LINE_1}\n${TOWN}\n${COUNTY}\n${POSTCODE}`
const FULL_ADDRESS_NO_COUNTY = `${ADDRESS_LINE_1}\n${ADDRESS_LINE_2}\n${TOWN}\n${POSTCODE}`
const PHONE_NUMBER = '07123456789'
const FORMATTED_PHONE_NUMBER = '+447123456789'
const PHONE_NUMBER_2 = '07111111111'
const EMAIL_ADDRESS = 'test@email.com'
const EMAIL_ADDRESS_2 = 'different-email-address@email.com'
const CHILD_NAME = 'Joe'
const VALID_PREGNANCY_MONTH_INCREMENT = 6

const CHILDRENS_DATES_OF_BIRTH = [
  { header: 'Name', value: CHILD_NAME },
  { header: 'Date of birth', value: formatDateForDisplayFromDate(dateLastYear()) }
]

module.exports = {
  LONG_STRING,
  BLANK_STRING,
  YES_LABEL,
  NO_LABEL,
  VALID_ELIGIBLE_NINO,
  DAY,
  MONTH,
  YEAR,
  DATE_OF_BIRTH,
  FIRST_NAME,
  LAST_NAME,
  FULL_NAME,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  TOWN,
  COUNTY,
  POSTCODE,
  FULL_ADDRESS,
  FULL_ADDRESS_NO_LINE_2,
  FULL_ADDRESS_NO_COUNTY,
  PHONE_NUMBER,
  FORMATTED_PHONE_NUMBER,
  PHONE_NUMBER_2,
  EMAIL_ADDRESS,
  EMAIL_ADDRESS_2,
  TEXT_LABEL,
  EMAIL_LABEL,
  TEXT,
  EMAIL,
  CHILDRENS_DATES_OF_BIRTH,
  CHILD_NAME,
  VALID_PREGNANCY_MONTH_INCREMENT
}
