const { CHECK_URL, CONFIRM_URL } = require('../constants')

const getPathsInSequence = (steps) => [...steps.map(step => step.path), CHECK_URL, CONFIRM_URL]

module.exports = {
  getPathsInSequence
}
