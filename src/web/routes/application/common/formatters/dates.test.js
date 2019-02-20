const test = require('tape')
const { toDateString, dateAsString, formatDateForDisplay, formatDateForDisplayFromDate } = require('./dates')

test('toDateString() should concatenate digits with hyphens', (t) => {
  const result = toDateString('31', '13', '1980')
  const expected = '1980-13-31'

  t.equal(result, expected, 'should concatenate digits with hyphens')
  t.end()
})

test('toDateString() should pad day and month', (t) => {
  const result = toDateString('1', '3', '1980')
  const expected = '1980-03-01'

  t.equal(result, expected, 'should pad day and month')
  t.end()
})

test('toDateString() should coerce all arguments to strings', (t) => {
  const result = toDateString(undefined, null, 22)
  const expected = '22-00-00'

  t.equal(result, expected, 'should coerce all arguments to strings')
  t.end()
})

test('dateAsString', (t) => {
  const DECEMBER = 11
  const date = new Date(1999, DECEMBER, 31)

  t.equal(dateAsString({ date: date, monthAdjustment: 8 }), '2000-08-31', '8 months from 1999-12-31 should be 2000-08-31')
  t.equal(dateAsString({ date: date }), '1999-12-31', '1999-12-31 is not formatted correctly')
  t.equal(dateAsString({ date: date, monthAdjustment: -2 }), '1999-10-31', '2 months from 1999-12-31 should ne 1999-10-31')
  t.throws(dateAsString.bind(null, { monthAdjustment: 'foo' }), /Month adjustment must be numeric/, 'not a valid month adjustment value')
  t.end()
})

test('formatDateForDisplay', (t) => {
  t.equal(formatDateForDisplay('30', '1', '1990'), '30 January 1990', 'should format date correctly')
  t.equal(formatDateForDisplay('02', '12', '2000'), '2 December 2000', 'should format date correctly')
  t.equal(formatDateForDisplay(5, 5, 2010), '5 May 2010', 'should format date correctly')
  t.end()
})

test('formatDateForDisplayFromDate', (t) => {
  t.equal(formatDateForDisplayFromDate(new Date(1990, 0, 30)), '30 January 1990', 'should format date correctly')
  t.throws(formatDateForDisplayFromDate.bind(null, { date: undefined }), /A date must be provided/, 'no date provided')
  t.throws(formatDateForDisplayFromDate.bind(null, { date: [] }), /A date must be provided/, 'no date provided')
  t.end()
})
