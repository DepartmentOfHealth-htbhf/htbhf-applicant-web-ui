const { CHECK_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('../../common/constants')

const getPathsInSequence = (steps) => [...steps.map(step => step.path), CHECK_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL]

module.exports = {
  getPathsInSequence
}
