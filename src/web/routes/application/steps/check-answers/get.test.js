const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const getPreviousPath = sinon.spy()
const { getLastNavigablePath } = proxyquire('./get', { '../../flow-control': { getPreviousPath } })

test('getLastNavigablePath returns path of last step if last step has no isNavigable function', (t) => {
  const steps = [{ path: '/first' }, { path: '/last' }]
  const session = {}

  const result = getLastNavigablePath(steps, session)

  t.equal(result, '/last')
  t.end()
})

test('returns path of last step if last step\'s isNavigable function returns true', (t) => {
  const steps = [{ path: '/first' }, { path: '/last', isNavigable: () => true }]
  const session = {}

  const result = getLastNavigablePath(steps, session)

  t.equal(result, '/last')
  t.end()
})

test('getLastNavigablePath calls getPreviousPath if last step isNavigable returns false', (t) => {
  const steps = [{ path: '/first' }, { path: '/last', isNavigable: () => false }]
  const session = {}

  getLastNavigablePath(steps, session)

  t.equal(getPreviousPath.called, true)
  t.end()
})
