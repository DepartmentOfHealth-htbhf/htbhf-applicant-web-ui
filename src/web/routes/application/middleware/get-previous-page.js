const { isNil } = require('ramda')

const getPreviousAllowedStep = (steps, index, session) => {
  if (index === 0) {
    throw new Error('No allowed back route found')
  }

  const previousStep = steps[index - 1]
  const { isNavigable, path } = previousStep

  if (isNil(isNavigable) || isNavigable(session)) {
    return path
  }

  return getPreviousAllowedStep(steps, index - 1, session)
}

const getPreviousPage = (steps, step, session) => {
  const index = steps.indexOf(step)

  if (index === -1) {
    throw new Error(`Unable to find ${JSON.stringify(step)} in the list of steps`)
  }

  // first page doesn't have a back link
  if (index > 0) {
    return getPreviousAllowedStep(steps, index, session)
  }
}

module.exports = {
  getPreviousAllowedStep,
  getPreviousPage
}
