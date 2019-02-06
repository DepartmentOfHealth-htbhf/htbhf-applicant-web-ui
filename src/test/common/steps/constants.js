// Create a string 501 characters long
const LONG_STRING = new Array(502).join('A')
const BLANK_STRING = ''
const YES = 'Yes'
const NO = 'No'

const VALID_NINO = 'QQ123456C'
const DAY = '30'
const MONTH = '12'
const YEAR = '1980'
const DATE_OF_BIRTH = `${DAY} ${MONTH} ${YEAR}`
const FIRST_NAME = 'Lisa'
const LAST_NAME = 'Simpson'
const FULL_NAME = `${FIRST_NAME} ${LAST_NAME}`
const ADDRESS_LINE_1 = 'Flat b'
const ADDRESS_LINE_2 = '123 Fake street'
const TOWN = 'Springfield'
const POSTCODE = 'AA11BB'
const FULL_ADDRESS = `${ADDRESS_LINE_1}\n${ADDRESS_LINE_2}\n${TOWN}\n${POSTCODE}`
const FULL_ADDRESS_NO_LINE_2 = `${ADDRESS_LINE_1}\n${TOWN}\n${POSTCODE}`

module.exports = {
  LONG_STRING,
  BLANK_STRING,
  YES,
  NO,
  VALID_NINO,
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
  POSTCODE,
  FULL_ADDRESS,
  FULL_ADDRESS_NO_LINE_2
}
