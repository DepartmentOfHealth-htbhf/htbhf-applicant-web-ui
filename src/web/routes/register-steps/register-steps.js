const { isUndefined, isString } = require('../../../common/predicates')
const { toBooleanStrict } = require('./to-boolean-strict')
const { logger } = require('../../logger')

/**
 *
 * All steps are registered except when:
 * - a toggle exists on the step but is undefined in config
 * - a toggle exists on the step and config for toggle is set to false
 *
 * Invalid toggle or config will throw errors:
 * - toggle must be a string
 * - config must be a boolean (if it exists)
 *
 * N.B. isStepEnabled coerces string representations of 'true' and 'false' to boolean
 * as it is assumed the config values will be set as environment variables.
 */
const isStepEnabled = config => step => {
  const toggleName = step.toggle

  if (isUndefined(toggleName)) {
    return true
  }

  if (!isString(toggleName)) {
    throw new Error(`Invalid toggle for step ${JSON.stringify(step)}. Toggle keys must be a string`)
  }

  try {
    const toggleValue = toBooleanStrict(config[toggleName])
    return isUndefined(toggleValue) ? false : toggleValue
  } catch (error) {
    throw new Error(`Invalid toggle config value [${toggleName}:${config[toggleName]}] for step ${JSON.stringify(step)}. ${error}`)
  }
}

/**
 *
 * Removes steps from array that are toggled off based on logic in isStepEnabled filter
 */
const registerSteps = (config, steps) => {
  logger.info(`Registering steps using feature toggles ${JSON.stringify(config)}`)
  return steps.filter(isStepEnabled(config))
}

module.exports = {
  registerSteps,
  isStepEnabled
}
