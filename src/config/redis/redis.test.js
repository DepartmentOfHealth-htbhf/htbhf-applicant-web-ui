const { parseRedisConfig } = require('./redis')
const test = require('tape')

const defaultConfig = {
  port: '6379',
  host: '127.0.0.1'
}

const vcapServices = {
  'redis': [
    {
      'credentials': {
        'host': 'remote.host',
        'name': 'myUsername',
        'password': 'myPassword',
        'port': 1234,
        'tls_enabled': true,
        'uri': 'rediss://myUsername:myPassword@remote.host:1234'
      }
    }
  ]
}

test('should parse redis credentials from VCAP_SERVICES', (t) => {
  const expected = { ...vcapServices.redis[0].credentials }
  expected.tls = { rejectUnauthorized: false }
  t.deepEqual(
    parseRedisConfig(defaultConfig, JSON.stringify(vcapServices)),
    expected,
    'Should parse redis credentials from JSON and set tls'
  )

  t.end()
})

test('should use defaults when VCAP_SERVICES not available', (t) => {
  t.deepEqual(
    parseRedisConfig(defaultConfig, ''),
    defaultConfig,
    'should use defaults when VCAP_SERVICES not available'
  )

  t.end()
})

test('should use defaults when VCAP_SERVICES has no redis credentials', (t) => {
  t.deepEqual(
    parseRedisConfig(defaultConfig, '{"redis":[]}'),
    defaultConfig,
    'should use defaults when redis has no values'
  )

  t.end()
})
