const test = require('tape')
const { formatDate } = require('./holding')

const TRY_AGAIN_LATER = 'Please try again later'
const translate = () => 'Please try again later'

test('formatDate returns try again later message when no date is provided', (t) => {
  const result = formatDate(undefined, { translate })

  t.equal(result, TRY_AGAIN_LATER)
  t.end()
})

test('formatDate returns try again later message when empty date is provided', (t) => {
  const result = formatDate('', { translate })

  t.equal(result, TRY_AGAIN_LATER)
  t.end()
})

test('formatDate returns try again later message when invalid date is provided', (t) => {
  const result = formatDate('10:10 40/15/2019', { translate })

  t.equal(result, TRY_AGAIN_LATER)
  t.end()
})

test('formatDate returns try again later message when date is not in the format \'HH:mm DD/MM/YYYY\'', (t) => {
  const result = formatDate('03/04/2019', { translate })

  t.equal(result, TRY_AGAIN_LATER)
  t.end()
})

test('formatDate returns formatted date when correct date is given', (t) => {
  const result = formatDate('14:30 03/04/2019', { translate })

  t.equal(result, '02:30 pm, Wednesday 03 April 2019')
  t.end()
})

test('formatDate returns formatted date in Welsh', (t) => {
  const result = formatDate('14:30 03/04/2019', { translate }, 'cy')

  t.equal(result, '02:30 pm, Dydd Mercher 03 Ebrill 2019')
  t.end()
})
