const test = require('tape')
const { randomSixDigitInteger } = require('./send-code')

test('randomSixDigitInteger returns random six digit integer', (t) => {
  const sixDigitRegex = new RegExp(/^\d{6}$/)

  // run test 10 times for test confidence as a random result is returned each time.
  for (let i = 0; i < 10; i += 1) {
    const result = randomSixDigitInteger()
    t.equal(sixDigitRegex.test(result), true)
  }
  t.end()
})
