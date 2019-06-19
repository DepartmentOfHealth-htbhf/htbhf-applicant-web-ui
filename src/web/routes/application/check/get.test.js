const test = require('tape')
const { getRowData, getLastStepPath, getFlattenedRowData } = require('./get')

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

test('getLastStepPath returns path of last step', (t) => {
  const steps = [
    {
      path: 'first',
      next: 'second'
    },
    {
      path: 'last'
    }
  ]

  const result = getLastStepPath(steps)

  t.equal(result, 'last')
  t.end()
})

test('getLastStepPath returns undefined if steps are an empty array', (t) => {
  const result = getLastStepPath([])

  t.equal(result, undefined)
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

test('getLastStepPath throws an error if steps are undefined', (t) => {
  t.throws(() => getLastStepPath(undefined),
    /steps should be a non empty array, instead got undefined/,
    'should throw error if steps are undefined')
  t.end()
})
