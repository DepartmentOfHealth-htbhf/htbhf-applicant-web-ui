const { apply } = require('./apply')
const { inScotland } = require('./in-scotland')
const { guidance } = require('./guidance')
const { configureTestSuite } = require('./configure-test-suite')

const ALL_TESTS = [apply, inScotland, guidance]

module.exports = {
  TEST_SUITE: ALL_TESTS.map(configureTestSuite)
}
