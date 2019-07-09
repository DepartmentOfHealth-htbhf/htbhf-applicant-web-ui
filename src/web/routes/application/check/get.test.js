const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const { getRowData, getFlattenedRowData } = require('./get')

const getPreviousPath = sinon.spy()
const { getLastNavigablePath } = proxyquire('./get', { '../common/get-previous-path': { getPreviousPath } })

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

test('getRowData should return an object combining path with row data', (t) => {
  const step = {
    contentSummary: () => ({ key: 'myKey', value: 'myValue' }),
    path: 'mypath'
  }
  const req = {}
  t.deepEqual(
    getRowData(req)(step),
    { key: 'myKey', value: 'myValue', path: 'mypath' },
    'should match expected row content'
  )
  t.end()
})

test('getRowData should return an array of objects combining path with row data', (t) => {
  const step = {
    contentSummary: () => ([{ key: 'myKey', value: 'myValue' }, { key: 'myKey2', value: 'myValue2' }]),
    path: 'mypath'
  }
  const req = {}
  t.deepEqual(
    getRowData(req)(step),
    [{ key: 'myKey', value: 'myValue', path: 'mypath' }, { key: 'myKey2', value: 'myValue2', path: 'mypath' }],
    'should match expected content for multiple rows'
  )
  t.end()
})

test('getFlattenedRowData returns flattened row data', (t) => {
  const step1 = {
    contentSummary: () => ([{ keyA: 'myKey1', valueA: 'myValue1' }, { keyB: 'myKey3', valueB: 'myValue3' }]),
    path: 'mypath1'
  }
  const step2 = {
    contentSummary: () => ({ key2: 'myKey2', value: 'myValue2' }),
    path: 'mypath2'
  }
  const req = {}
  const steps = [step1, step2]

  const result = getFlattenedRowData(req)(steps)

  t.deepEqual(result,
    [{ keyA: 'myKey1', valueA: 'myValue1', path: 'mypath1' }, { keyB: 'myKey3', valueB: 'myValue3', path: 'mypath1' }, { key2: 'myKey2', value: 'myValue2', path: 'mypath2' }],
    'should flatten step content summary')
  t.end()
})

test('getFlattenedRowData returns flattened row data with step with empty content removed', (t) => {
  const step1 = {
    contentSummary: () => ({ key1: 'myKey1', value1: 'myValue1' }),
    path: 'mypath1'
  }
  const step2 = {
    path: 'mypath2'
  }
  const req = {}
  const steps = [step1, step2]

  const result = getFlattenedRowData(req)(steps)

  t.deepEqual(result,
    [{ key1: 'myKey1', value1: 'myValue1', path: 'mypath1' }],
    'should flatten step with content summary and remove step without content summary')
  t.end()
})
