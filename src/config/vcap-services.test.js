const test = require('tape')
const proxyquire = require('proxyquire')

const cfenvNoUserProvidedService = {
  getAppEnv: () => ({
    services: {
      'redis': [
        {
          'binding_name': null,
          'credentials': {
            'name': 'test',
            'password': 'test'
          }
        }
      ]
    }
  })
}

const cfenvEmptyUserProvidedService = {
  getAppEnv: () => ({
    services: {
      'user-provided': []
    }
  })
}

test('getVariableServiceCredentials()', (t) => {
  const trackingId = 'test'
  const cfenv = {
    getAppEnv: () => ({
      services: {
        'user-provided': [
          {
            'credentials': {
              'GA_TRACKING_ID': trackingId
            },
            'instance_name': 'variable-service'
          },
          {
            'credentials': {},
            'instance_name': 'logit-ssl-drain'
          }
        ]
      }
    })
  }
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenv })

  const result = vcapServices.getVariableServiceCredentials()

  t.deepEqual(result.GA_TRACKING_ID, trackingId)
  t.end()
})

test('getNotifyVariableServiceCredentials()', (t) => {
  const notifyApiKey = 'test'
  const cfenv = {
    getAppEnv: () => ({
      services: {
        'user-provided': [
          {
            'credentials': {
              'NOTIFY_API_KEY': notifyApiKey
            },
            'instance_name': 'notify-variable-service'
          },
          {
            'credentials': {},
            'instance_name': 'logit-ssl-drain'
          }
        ]
      }
    })
  }
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenv })

  const result = vcapServices.getNotifyVariableServiceCredentials()

  t.deepEqual(result.NOTIFY_API_KEY, notifyApiKey)
  t.end()
})

test('getVariableServiceCredentials() throws error when no user provided services', (t) => {
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenvNoUserProvidedService })

  t.throws(() => vcapServices.getVariableServiceCredentials(), /Expected an array of user-provided services, got undefined/)
  t.end()
})

test('getNotifyVariableServiceCredentials() throws error when no user provided services', (t) => {
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenvNoUserProvidedService })

  t.throws(() => vcapServices.getNotifyVariableServiceCredentials(), /Expected an array of user-provided services, got undefined/)
  t.end()
})

test('getVariableServiceCredentials() throws an error when there are multiple services called variable-service', (t) => {
  const cfenv = {
    getAppEnv: () => ({
      services: {
        'user-provided': [
          {
            'instance_name': 'variable-service'
          },
          {
            'instance_name': 'variable-service'
          }
        ]
      }
    })
  }
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenv })

  t.throws(() => vcapServices.getVariableServiceCredentials(), 'Expected exactly one variable-service, instead found 2')
  t.end()
})

test('getNotifyVariableServiceCredentials() throws an error when there are multiple services called notify-variable-service', (t) => {
  const cfenv = {
    getAppEnv: () => ({
      services: {
        'user-provided': [
          {
            'instance_name': 'notify-variable-service'
          },
          {
            'instance_name': 'notify-variable-service'
          }
        ]
      }
    })
  }
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenv })

  t.throws(() => vcapServices.getNotifyVariableServiceCredentials(), 'Expected exactly one variable-service, instead found 2')
  t.end()
})

test('getVariableServiceCredentials() throws an error when there no services called variable-service', (t) => {
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenvEmptyUserProvidedService })

  t.throws(() => vcapServices.getVariableServiceCredentials(), /Expected exactly one variable-service, instead found 0/)
  t.end()
})

test('getNotifyVariableServiceCredentials() throws an error when there no services called notify-variable-service', (t) => {
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenvEmptyUserProvidedService })

  t.throws(() => vcapServices.getNotifyVariableServiceCredentials(), /Expected exactly one variable-service, instead found 0/)
  t.end()
})

test('getRedisCredentials()', (t) => {
  const credentials = {
    'host': 'localhost',
    'port': 6379,
    'tls_enabled': false,
    'uri': 'localhost:6379'
  }
  const cfenv = {
    getAppEnv: () => ({
      services: {
        'redis': [
          {
            credentials,
            'instance_name': 'help-to-buy-healthy-foods-redis',
            'label': 'redis'
          }
        ]
      }
    })
  }
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenv })

  const result = vcapServices.getRedisCredentials()

  t.deepEqual(result, credentials)
  t.end()
})

test('getRedisCredentials() throws an error when there are multiple services called redis', (t) => {
  const credentials = {
    'host': 'localhost',
    'port': 6379,
    'tls_enabled': false,
    'uri': 'localhost:6379'
  }
  const cfenv = {
    getAppEnv: () => ({
      services: {
        'redis': [
          {
            credentials,
            'instance_name': 'redis',
            'label': 'redis'
          },
          {
            credentials,
            'instance_name': 'redis',
            'label': 'redis'
          }
        ]
      }
    })
  }
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenv })

  t.throws(() => vcapServices.getRedisCredentials(), /Expected exactly one redis service, instead found 2/)
  t.end()
})

test('getRedisCredentials() throws an error when there are zero services called redis', (t) => {
  const cfenv = {
    getAppEnv: () => ({
      services: {
      }
    })
  }
  const vcapServices = proxyquire('./vcap-services', { 'cfenv': cfenv })

  t.throws(() => vcapServices.getRedisCredentials(), /Expected an array of redis services, got undefined/)
  t.end()
})
