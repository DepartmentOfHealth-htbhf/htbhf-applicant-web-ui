const test = require('tape')
const { getLanguageBase } = require('./language')

test('getLanguageBase', async (t) => {
  t.equal(getLanguageBase('en-GB'), 'en', 'should strip down to just en')
  t.equal(getLanguageBase('us-CA'), 'us', 'should strip down to just us')
  t.equal(getLanguageBase('cy'), 'cy', 'should remain as just cy')
  t.throws(getLanguageBase.bind(null, ''), /language provided in the request is blank/, 'A blank language should throw an error')
  t.throws(getLanguageBase.bind(null, undefined), /language provided in the request is blank/, 'An undefined language should throw an error')
  t.end()
})
