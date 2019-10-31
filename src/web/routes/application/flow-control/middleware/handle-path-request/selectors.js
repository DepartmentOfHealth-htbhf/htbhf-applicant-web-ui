const { CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('../../../steps/common/constants')

const getPathsInSequence = (steps) => [...steps.map(step => step.path), CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL]

module.exports = {
  getPathsInSequence
}
