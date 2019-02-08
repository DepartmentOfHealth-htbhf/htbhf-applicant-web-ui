const test = require('tape')
const { isNilOrEmpty } = require('./predicates')

test('isNilOrEmpty', (t) => {
  t.equal(isNilOrEmpty(''), true, 'should be marked as empty')
  t.equal(isNilOrEmpty(null), true, 'should be marked as empty')
  t.equal(isNilOrEmpty(undefined), true, 'should be marked as empty')
  t.equal(isNilOrEmpty('Something'), false, 'should not be marked as empty')
  t.end()
})
