const test = require('tape')
const { getContentSummary, groupByList, normaliseRows, getSummaryListsForSteps } = require('./get-row-data')
const { DEFAULT_LIST } = require('./constants')

test('getContentSummary should return an object combining path with row data', (t) => {
  const step = {
    contentSummary: () => ({ key: 'myKey', value: 'myValue' }),
    path: 'mypath'
  }
  const req = {}
  t.deepEqual(
    getContentSummary(req)(step),
    { key: 'myKey', value: 'myValue', path: 'mypath' },
    'should match expected row content'
  )
  t.end()
})

test('getContentSummary should return an array of objects combining path with row data', (t) => {
  const step = {
    contentSummary: () => ([{ key: 'myKey', value: 'myValue' }, { key: 'myKey2', value: 'myValue2' }]),
    path: 'mypath'
  }
  const req = {}
  t.deepEqual(
    getContentSummary(req)(step),
    [{ key: 'myKey', value: 'myValue', path: 'mypath' }, { key: 'myKey2', value: 'myValue2', path: 'mypath' }],
    'should match expected content for multiple rows'
  )
  t.end()
})

test('getContentSummary should return null when contentSummary() returns null', (t) => {
  const step = {
    contentSummary: () => null
  }
  const req = {}

  t.equal(getContentSummary(req)(step), null, 'should return null')
  t.end()
})

test('normaliseRows() flattens nested iterables and removes empty values', (t) => {
  const rows = [
    {
      key: 'email address',
      value: 'my@email.com'
    },
    [
      {
        key: 'addressline1',
        value: '10 Downing Street'
      },
      {
        key: 'addressline2',
        value: 'London'
      }
    ],
    null
  ]

  const expected = [
    {
      key: 'email address',
      value: 'my@email.com'
    },
    {
      key: 'addressline1',
      value: '10 Downing Street'
    },
    {
      key: 'addressline2',
      value: 'London'
    }
  ]

  const result = normaliseRows(rows)

  t.deepEqual(result, expected, 'flattens nested iterables and removes empty values')
  t.end()
})

test('groupByList returns an object with row data grouped by list', (t) => {
  const rowData = [
    {
      list: 'About you',
      key: 'email address',
      value: 'my@email.com'
    },
    {
      list: 'About your children',
      key: 'Do you have children',
      value: 'yes'
    },
    {
      list: 'About you',
      key: 'Telephone',
      value: '111-111-111-111'
    }
  ]

  const expected = {
    'About you': [
      {
        list: 'About you',
        key: 'email address',
        value: 'my@email.com'
      },
      {
        list: 'About you',
        key: 'Telephone',
        value: '111-111-111-111'
      }
    ],
    'About your children': [
      {
        list: 'About your children',
        key: 'Do you have children',
        value: 'yes'
      }
    ]
  }

  const result = groupByList(rowData)

  t.deepEqual(result, expected, 'returns an object with row data grouped by list')
  t.end()
})

test('getSummaryListsForSteps returns row data grouped by list', (t) => {
  const step1 = {
    contentSummary: () => ([{ keyA: 'myKeyA', valueA: 'myValueA', list: 'list1' }, { keyB: 'myKeyB', valueB: 'myValueB', list: 'list1' }]),
    path: 'mypath1'
  }
  const step2 = {
    contentSummary: () => ({ key2: 'myKey2', value: 'myValue2', list: 'list2' }),
    path: 'mypath2'
  }
  const step3 = {
    contentSummary: () => ({ key3: 'myKey3', value: 'myValue3', list: 'list1' }),
    path: 'mypath3'
  }
  const req = {}
  const steps = [step1, step2, step3]

  const expected = {
    list1: [
      { keyA: 'myKeyA', valueA: 'myValueA', list: 'list1', path: 'mypath1' },
      { keyB: 'myKeyB', valueB: 'myValueB', list: 'list1', path: 'mypath1' },
      { key3: 'myKey3', value: 'myValue3', list: 'list1', path: 'mypath3' }
    ],
    list2: [
      { key2: 'myKey2', value: 'myValue2', path: 'mypath2', list: 'list2' }
    ]
  }

  const result = getSummaryListsForSteps({ req, steps })

  t.deepEqual(result, expected, 'returns row data grouped by list')
  t.end()
})

test('getSummaryListsForSteps sets a default list if no list is defined', (t) => {
  const step1 = {
    contentSummary: () => ({ key1: 'myKey1', value: 'myValue1' }),
    path: 'mypath1'
  }
  const step2 = {
    contentSummary: () => ({ key2: 'myKey2', value: 'myValue2', list: 'list2' }),
    path: 'mypath2'
  }
  const req = {}
  const steps = [step1, step2]

  const expected = {
    [DEFAULT_LIST]: [{ key1: 'myKey1', value: 'myValue1', path: 'mypath1' }],
    list2: [{ key2: 'myKey2', value: 'myValue2', list: 'list2', path: 'mypath2' }]
  }

  const result = getSummaryListsForSteps({ req, steps })

  t.deepEqual(result, expected, 'sets a default list if no list is defined')
  t.end()
})
