const { apply } = require('./apply')
const { iLiveInScotland } = require('./i-live-in-scotland')
const { guidance } = require('./guidance')
const { configureTestSuite } = require('./configure-test-suite')

const ALL_TESTS = [apply, iLiveInScotland, guidance]

module.exports = {
  TEST_SUITE: ALL_TESTS.map(configureTestSuite)
}
