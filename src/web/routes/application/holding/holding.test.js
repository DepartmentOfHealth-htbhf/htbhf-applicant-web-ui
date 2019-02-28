const test = require('tape')
const { formatDate, getServiceAvailableFromMessage } = require('./holding')

const translate = (input) => {
  if (input === 'holding.useServiceFrom') {
    return 'You will be able to use the service from'
  } else if (input === 'holding.tryAgainLater') {
    return 'Please try again later.'
  }
}

test('formatDate returns undefined when no date is provided', (t) => {
  const result = formatDate(undefined)

  t.equal(result, undefined)
  t.end()
})

test('formatDate returns undefined when empty date is provided', (t) => {
  const result = formatDate('')

  t.equal(result, undefined)
  t.end()
})

test('formatDate returns undefined when invalid date is provided', (t) => {
  const result = formatDate('10:10 40/15/2019')

  t.equal(result, undefined)
  t.end()
})

test('formatDate returns undefined when date is not in the format \'HH:mm DD/MM/YYYY\'', (t) => {
  const result = formatDate('03/04/2019')

  t.equal(result, undefined)
  t.end()
})

test('formatDate returns formatted date when correct date is given', (t) => {
  const result = formatDate('14:30 03/04/2019')

  t.equal(result, '02:30 pm, Wednesday 03 April 2019')
  t.end()
})

test('formatDate returns formatted date in Welsh', (t) => {
  const result = formatDate('14:30 03/04/2019', 'cy')

  t.equal(result, '02:30 pm, Dydd Mercher 03 Ebrill 2019')
  t.end()
})

test('getServiceAvailableFromMessage returns message with date when date is given', (t) => {
  const result = getServiceAvailableFromMessage('02:30 pm, Wednesday 03 April 2019', translate)

  t.deepEquals(result, 'You will be able to use the service from 02:30 pm, Wednesday 03 April 2019')
  t.end()
})

test('getServiceAvailableFromMessage returns try again message when no date is given', (t) => {
  const result = getServiceAvailableFromMessage(undefined, translate)

  t.deepEquals(result, 'Please try again later.')
  t.end()
})
