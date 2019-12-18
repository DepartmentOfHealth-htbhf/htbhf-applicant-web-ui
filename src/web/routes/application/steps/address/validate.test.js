const test = require('tape')
const safeRegex = require('safe-regex')

const { UK_POSTCODE_PATTERN, CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN } = require('./constants')

test('invalid postcode does not match regex', (t) => {
  const invalidPostcodes = [
    'AA1122BB',
    'A',
    '11AA21',
    '',
    'E!',
    'EA123',
    'AAAAAAAAAAAAAAAAAAADN55 1PT',
    'DN55 1PTAAAAAAAAAAAAAAAAAA',
    'QQ11QQ'
  ]

  invalidPostcodes.forEach(function (postcode) {
    const match = postcode.match(UK_POSTCODE_PATTERN)
    t.equal(match, null)
  })

  t.end()
})

test('valid postcode matches regex', (t) => {
  const validPostcodes = [
    'EC11BB',
    'W1A0AX',
    'M11AE',
    'B338TH',
    'CR26XH',
    'DN551PT',
    'DN55 1PT'
  ]

  validPostcodes.forEach(function (postcode) {
    const match = postcode.match(UK_POSTCODE_PATTERN)
    t.deepEqual(match[0], postcode)
  })

  t.end()
})

test('postcode regex is secure', (t) => {
  t.equal(safeRegex(UK_POSTCODE_PATTERN), true)
  t.end()
})

test('channel island and iom postcode regex is secure', (t) => {
  t.equal(safeRegex(CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN), true)
  t.end()
})

test('channel island and iom postcode regex matches channel island and iom postcodes', (t) => {
  const channelIslandAndIOMPostcodes = [
    'GY1 1WR',
    'JE3 1FU',
    'IM1 3LY',
    'Gy1 1wr',
    'je311fu',
    'im13ly'
  ]

  channelIslandAndIOMPostcodes.forEach(postcode => {
    const match = CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN.test(postcode)
    t.equal(match, true)
  })

  t.end()
})

test('channel island and iom postcode regex does not match UK postcodes', (t) => {
  const ukPostcodes = [
    'GA11BB',
    'JA10AX',
    'M11AE',
    'IO338TH',
    'CY26IM',
    'DE551JE',
    'DM55 1GY'
  ]

  ukPostcodes.forEach(postcode => {
    const match = CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN.test(postcode)
    t.equal(match, false, `postcode=${postcode}`)
  })

  t.end()
})
