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
const POSTCODE = 'BS14TB'
const PHONE_NUMBER = '07123456789'
const EMAIL_ADDRESS = 'test@email.com'
const TEXT = 'text'

module.exports = {
  VALID_ELIGIBLE_NINO,
  POSTCODE,
  PHONE_NUMBER,
  EMAIL_ADDRESS,
  TEXT
}
