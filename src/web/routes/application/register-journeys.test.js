const test = require('tape')
const { getPathsInSequence, registerJourney } = require('./register-journeys')
const { CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('./paths')

const steps = [
  {
    path: '/first'
  },
  {
    path: '/second',
    toggle: 'STEP_TWO_ENABLED'
  },
  {
    path: '/third'
  }
]

test('getPathsInSequence() returns the correct sequence of paths', (t) => {
  const expected = ['/first', '/second', '/third', CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL]
  const result = getPathsInSequence(steps)

  t.deepEqual(result, expected, 'returns the correct sequence of paths')
  t.end()
})

test('registerJourney() registers journeys with correct properties', (t) => {
  const features = {
    STEP_TWO_ENABLED: false
  }

  const journey = {
    steps
  }

  const result = registerJourney(features)(journey)

  const expected = {
    steps: [{ path: '/first' }, { path: '/third' }],
    pathsInSequence: ['/first', '/third', CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL]
  }

  t.deepEqual(result, expected, 'registers journeys with correct properties')
  t.end()
})
