const { isUndefined, isBoolean, isString } = require('./predicates')

const isInvalidFeatureToggleConfigValue = toggleValue => !isUndefined(toggleValue) && !isBoolean(toggleValue)

const shouldRegisterStep = config => step => {
  if (isUndefined(step.toggle)) {
    return true
  }

  if (!isString(step.toggle)) {
    throw new Error(`Invalid toggle for step ${JSON.stringify(step)}. Toggle keys must be a string`)
  }

  const toggleValue = config[step.toggle]

  if (isInvalidFeatureToggleConfigValue(toggleValue)) {
    throw new Error(`Invalid toggle config value for step ${JSON.stringify(step)}. Config values for toggles must be boolean`)
  }

  return toggleValue
}

const registerSteps = (config, steps) => steps.filter(shouldRegisterStep(config))

module.exports = {
  registerSteps
}
