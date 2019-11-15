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

test('getPathsInSequence() returns the correct sequence of paths when no prefix is defined', (t) => {
  const expected = ['/first', '/second', '/third', CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL]
  const result = getPathsInSequence(undefined, steps)

  t.deepEqual(result, expected, 'returns the correct sequence of paths')
  t.end()
})

test('getPathsInSequence() returns the correct sequence of paths when a prefix is defined', (t) => {
  const prefix = '/my-journey'
  const expected = ['/my-journey/first', '/my-journey/second', '/my-journey/third', `/my-journey${CHECK_ANSWERS_URL}`, `/my-journey${TERMS_AND_CONDITIONS_URL}`, `/my-journey${CONFIRM_URL}`]
  const result = getPathsInSequence(prefix, steps)

  t.deepEqual(result, expected, 'returns the correct sequence of paths')
  t.end()
})

test('registerJourney() registers journeys with correct properties when no path prefix is defined', (t) => {
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

test('registerJourney() registers journeys with correct properties when path prefix is defined', (t) => {
  const features = {
    STEP_TWO_ENABLED: false
  }

  const pathPrefix = '/my-journey'

  const journey = {
    steps,
    pathPrefix
  }

  const result = registerJourney(features)(journey)

  const expected = {
    steps: [{ path: '/my-journey/first' }, { path: '/my-journey/third' }],
    pathPrefix: '/my-journey',
    pathsInSequence: ['/my-journey/first', '/my-journey/third', `/my-journey${CHECK_ANSWERS_URL}`, `/my-journey${TERMS_AND_CONDITIONS_URL}`, `/my-journey${CONFIRM_URL}`]
  }

  t.deepEqual(result, expected, 'registers journeys with correct properties')
  t.end()
})
