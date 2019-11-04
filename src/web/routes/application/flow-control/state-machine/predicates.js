const { equals, isNil } = require('ramda')

/**
 * Next path is navigable if the next step does not exist, if it doesn't define an isNavigable function, or that function returns true.
 * E.g. if the current step is the end of the 'in-progress' journey, the next path will be /check-answers. There is no step matching /check-answers, so we assume it is navigable.
 */
const isNextPathNavigable = (nextStep, req) => isNil(nextStep) || isNil(nextStep.isNavigable) || nextStep.isNavigable(req.session)

const isPathAllowed = (sequence, allowed, path) => sequence.findIndex(equals(path)) <= sequence.findIndex(equals(allowed))

module.exports = {
  isNextPathNavigable,
  isPathAllowed
}
