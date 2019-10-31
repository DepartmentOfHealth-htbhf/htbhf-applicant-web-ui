const test = require('tape')
const { createChildrenDobArray } = require('./request-body')

const CHILDREN = {
  'childName-1': 'First',
  'childDob-1-day': '1',
  'childDob-1-month': '1',
  'childDob-1-year': '2018',
  'childName-2': 'Second',
  'childDob-2-day': '2',
  'childDob-2-month': '2',
  'childDob-2-year': '2017',
  'childDob-1': '2018-01-01',
  'childDob-2': '2017-02-02',
  'inputCount': 2,
  'childCount': 2
}

test('createChildrenDob extracts childrens dates of birth', (t) => {
  const expectedChildren = ['2018-01-01', '2017-02-02']

  const childrenList = createChildrenDobArray(CHILDREN)

  t.deepEqual(childrenList, expectedChildren)
  t.end()
})

test('createChildrenDob returns null with undefined children object provided', (t) => {
  let children

  const childrenList = createChildrenDobArray(children)

  t.equals(childrenList, null)
  t.end()
})

test('createChildrenDob returns null when children argument is null', (t) => {
  const childrenList = createChildrenDobArray(null)

  t.equals(childrenList, null)
  t.end()
})

test('createChildrenDob throws an error when the childCount is 1 and there is no date of birth in the session.children object', (t) => {
  // This object is invalid because it doesn't have the constructed date for the first child under the key childDob-1
  const invalidConstructedChildren = {
    'childName-1': 'First',
    'childDob-day': '1',
    'childDob-month': '1',
    'childDob-year': '2018',
    'inputCount': 1,
    'childCount': 1
  }

  const childrenList = createChildrenDobArray.bind(null, invalidConstructedChildren)
  t.throws(childrenList, /No child date of birth stored in session for childDob-1/, 'should throw an error when on dob stored for child')
  t.end()
})
