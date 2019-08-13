const test = require('tape')
const { registerSteps } = require('./register-steps')

const step1 = {
  path: '/first'
}

const step2 = {
  path: '/second',
  toggle: 'STEP_2_ENABLED'
}

test('registerSteps() registers step if no toggle defined', (t) => {
  const steps = [step1]
  const config = {}
  const result = registerSteps(config, steps)
  const expected = [step1]
  t.deepEqual(result, expected, 'registers step if no toggle defined')
  t.end()
})

test('registerSteps() does not register step if toggle exists for step but not in config', (t) => {
  const steps = [step2]
  const config = {}
  const result = registerSteps(config, steps)
  const expected = []
  t.deepEqual(result, expected, 'does not register step if toggle exists for step but not in config')
  t.end()
})

test('registerSteps() registers step if toggle exists on step and is enabled in config', (t) => {
  const steps = [step2]
  const config = { STEP_2_ENABLED: true }
  const result = registerSteps(config, steps)
  const expected = [step2]
  t.deepEqual(result, expected, 'registers step if toggle exists on step and is enabled in config')
  t.end()
})

test('registerSteps() does not register step if toggle exists for step and is disabled in config', (t) => {
  const steps = [step2]
  const config = { STEP_2_ENABLED: false }
  const result = registerSteps(config, steps)
  const expected = []
  t.deepEqual(result, expected, 'does not register step if toggle exists for step and is disabled in config')
  t.end()
})

test('registerSteps() throws an error if toggle is not boolean', (t) => {
  const steps = [step2]
  const config = { STEP_2_ENABLED: 'elephant' }
  const result = () => registerSteps(config, steps)
  t.throws(result, /Invalid toggle config value \[STEP_2_ENABLED:elephant\] for step {"path":"\/second","toggle":"STEP_2_ENABLED"}. Error: Can’t coerce elephant to boolean/, 'throws an error if toggle is not boolean')
  t.end()
})

test('registerSteps() throws an error if toggle key is not a string', (t) => {
  const invalidStep = {
    path: '/path',
    toggle: false
  }
  const steps = [invalidStep]
  const config = { STEP_2_ENABLED: true }
  const result = () => registerSteps(config, steps)
  t.throws(result, /Invalid toggle for step {"path":"\/path","toggle":false}. Toggle keys must be a string/, 'throws an error if toggle key is not a string')
  t.end()
})
