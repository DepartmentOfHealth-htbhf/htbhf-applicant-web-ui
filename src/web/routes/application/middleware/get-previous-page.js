const { isNil } = require('ramda')

const getPreviousNavigablePath = (steps, index, session) => {
  if (index === 0) {
    throw new Error('No allowed back route found')
  }

  const previousStep = steps[index - 1]
  const { isNavigable, path } = previousStep

  if (isNil(isNavigable)) {
    return path
  }

  if (typeof isNavigable !== 'function') {
    throw new Error(`isNavigable must be a function for step ${JSON.stringify(previousStep)}`)
  }

  if (typeof isNavigable(session) !== 'boolean') {
    throw new Error(`isNavigable must return a boolean for step ${JSON.stringify(previousStep)}`)
  }

  return isNavigable(session) ? path : getPreviousNavigablePath(steps, index - 1, session)
}

const getPreviousPath = (steps, step, session) => {
  const index = steps.indexOf(step)

  if (index === -1) {
    throw new Error(`Unable to find ${JSON.stringify(step)} in the list of steps`)
  }

  // first page doesn't have a back link
  if (index > 0) {
    return getPreviousNavigablePath(steps, index, session)
  }
}

module.exports = {
  getPreviousNavigablePath,
  getPreviousPath
}
