const { CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL } = require('../../../paths')
const { isNextPathNavigable } = require('../predicates')
const { getNextForStep } = require('./get-next-for-step')

const getStepForPath = (path, steps) => steps.find(step => step.path === path)

const getNextInReviewPath = (req) => req.path === CHECK_ANSWERS_URL ? TERMS_AND_CONDITIONS_URL : CHECK_ANSWERS_URL

/**
 * Ask the current step for the next path. Test whether the step matching that path is navigable. If not, ask that step for the next path; repeat.
 * @param path the path of the current step
 * @param req the current request
 * @param steps the steps of the apply journey
 * @returns the path of the next step
 */
const getNextNavigablePath = (path, req, steps) => {
  const thisStep = getStepForPath(path, steps)
  const nextPath = getNextForStep(req, thisStep, steps)
  const nextStep = getStepForPath(nextPath, steps)
  if (isNextPathNavigable(nextStep, req)) {
    return nextPath
  }
  return getNextNavigablePath(nextPath, req, steps)
}

module.exports = {
  getNextNavigablePath,
  getNextInReviewPath
}
