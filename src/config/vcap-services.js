const { path } = require('ramda')
const cfenv = require('cfenv')

function getVCAPServices (service) {
  const services = path(['services', service], cfenv.getAppEnv())
  if (!Array.isArray(services)) {
    throw new Error(`Expected an array of ${service} services, got ${typeof services}`)
  }
  return services
}

function getService (userProvidedServices, serviceName) {
  const services = userProvidedServices.filter(service => service.instance_name === serviceName)
  if (services.length !== 1) {
    throw new Error(`Expected exactly one ${serviceName}, instead found ${services.length}`)
  }
  return services[0]
}

const getServiceCredentials = (serviceName) => {
  const userProvidedServices = getVCAPServices('user-provided')
  const variableService = getService(userProvidedServices, serviceName)
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
    ? getServiceCredentials('variable-service')[name]
    : process.env[name] || defaultValue

const getVCAPServiceNotifyVariable = (name, defaultValue = '') =>
  process.env.VCAP_SERVICES
    ? getServiceCredentials('notify-variable-service')[name]
    : process.env[name] || defaultValue

const getVCAPServiceOSPlacesVariable = (name, defaultValue = '') =>
  process.env.VCAP_SERVICES
    ? getServiceCredentials('os-places-variable-service')[name]
    : process.env[name] || defaultValue

module.exports = {
  getRedisCredentials,
  getServiceCredentials,
  getVCAPServicesVariable,
  getVCAPServiceNotifyVariable,
  getVCAPServiceOSPlacesVariable
}
