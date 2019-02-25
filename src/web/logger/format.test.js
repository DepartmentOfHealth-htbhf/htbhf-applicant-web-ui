const test = require('tape')
const { logFormatter } = require('./format')

test('logFormatter() formats log correctly if IDs are not available', (t) => {
  const req = {}
  const level = 'info'
  const message = 'log message'
  const timestamp = '2019-02-14'

  const result = logFormatter({ level, message, timestamp, req })
  const expected = '2019-02-14 INFO [][] log message'

  t.equal(result, expected, 'formats log correctly if IDs are not available')
  t.end()
})

test('logFormatter() formats log correctly if IDs are available', (t) => {
  const req = {
    headers: {
      'x-request-id': '1234'
    },
    sessionID: '5678'
  }
  const level = 'info'
  const message = 'log message'
  const timestamp = '2019-02-14'

  const result = logFormatter({ level, message, timestamp, req })
  const expected = '2019-02-14 INFO [5678][1234] log message'

  t.equal(result, expected, 'formats log correctly if IDs are available')
  t.end()
})
