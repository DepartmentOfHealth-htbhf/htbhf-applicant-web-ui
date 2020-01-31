function randomCharFromChars (chars) {
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

/**
 * Generates a two character string where neither character is "X" or any other characters
 * considered invalid by DWP
 */
const VALID_NINO_CHARS = 'ABCEGHJKLMNPRSTWYZ'

function randomNinoChar () {
  return randomCharFromChars(VALID_NINO_CHARS)
}

function randomEligibleTwoChars () {
  return `${randomNinoChar()}${randomNinoChar()}`
}

/*
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
const VALID_NINO_REGEXP = /(?!BG|GB|NK|KN|TN|NT|ZZ)[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z](\d{6})[A-D]/

const isInvalidNino = nino => !nino.match(VALID_NINO_REGEXP)

function generateEligibleNino () {
  // If it does then try again, repeat.
  const nino = `${randomEligibleTwoChars()}12${randomFourDigitInteger()}${randomCharAtoC()}`

  if (isInvalidNino(nino)) {
    console.log(`Invalid NINO [${nino}], regenerating`)
    return generateEligibleNino()
  }

  console.log(`Generated eligible NINO [${nino}]`)
  return nino
}

// use a random nino for each test run to prevent duplication errors during compatibility and accessibility tests.
const VALID_ELIGIBLE_NINO = generateEligibleNino()
const POSTCODE = 'BS14TB'
const PHONE_NUMBER = '07123456789'
const EMAIL_ADDRESS = 'test@email.com'
const TEXT = 'text'
const NHS_NUMBER = 'H1234'

module.exports = {
  VALID_ELIGIBLE_NINO,
  POSTCODE,
  PHONE_NUMBER,
  EMAIL_ADDRESS,
  TEXT,
  NHS_NUMBER
}
