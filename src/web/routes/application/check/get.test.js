const test = require('tape')
const { getRowData, getLastStepPath } = require('./get')

test('getRowData should return an object combining path with row data', (t) => {
  const step = {
    contentSummary: () => ({ key: 'myKey', value: 'myValue' }),
    path: 'mypath'
  }
  const req = {}
  t.deepEqual(
    getRowData(req)(step),
    [{ key: 'myKey', value: 'myValue', path: 'mypath' }],
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

test('getLastStepPath throws an error if steps are undefined', (t) => {
  t.throws(() => getLastStepPath(undefined), 'steps should be an array, instead got undefined')
  t.end()
})
