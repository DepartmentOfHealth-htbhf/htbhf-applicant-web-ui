const { path } = require('ramda')
const cfenv = require('cfenv')

function getVCAPServices (service) {
  const services = path(['services', service], cfenv.getAppEnv())
  if (!Array.isArray(services)) {
    throw new Error(`Expected an array of ${service} services, got ${typeof services}`)
  }
  return services
}

function getVariableService (userProvidedServices) {
  const variableServices = userProvidedServices.filter(service => service.instance_name === 'variable-service')
  if (variableServices.length !== 1) {
    throw new Error(`Expected exactly one variable-service, instead found ${variableServices.length}`)
  }
  return variableServices[0]
}

const getVariableServiceCredentials = () => {
  const userProvidedServices = getVCAPServices('user-provided')
  const variableService = getVariableService(userProvidedServices)
  return variableService.credentials
}

const getRedisCredentials = () => {
  const redisServices = getVCAPServices('redis')
  if (redisServices.length !== 1) {
    throw new Error(`Expected exactly one redis service, instead found ${redisServices.length}`)
  }

  return redisServices[0].credentials
}

const getVCAPServicesVariable = (name, defaultValue = '') =>
  process.env.VCAP_SERVICES
    ? getVariableServiceCredentials()[name]
    : process.env[name] || defaultValue

module.exports = {
  getRedisCredentials,
  getVariableServiceCredentials,
  getVCAPServicesVariable
}
