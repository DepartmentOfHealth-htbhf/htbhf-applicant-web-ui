//const { apply } = require('./apply')
//const { inScotland } = require('./in-scotland')
//const { guidance } = require('./guidance')
const { configureTestSuite } = require('./configure-test-suite')
const { nhsNumber } = require('./nhs-number')

//const ALL_TESTS = [apply, inScotland, guidance,nhsNumber]

const ALL_TESTS = [nhsNumber]

module.exports = {
  TEST_SUITE: ALL_TESTS.map(configureTestSuite)
}
