const test = require('tape')
const { requestBody } = require('./request-body')

const CLAIM_WITH_EXPECTED_DELIVERY_DATE = {
  areYouPregnant: 'yes',
  'expectedDeliveryDate-day': '01',
  'expectedDeliveryDate-month': '03',
  'expectedDeliveryDate-year': '2019'
}

const CLAIM_WITHOUT_EXPECTED_DELIVERY_DATE = {
  areYouPregnant: 'no'
}

test('requestBody() adds expected delivery date when claimant is pregnant', (t) => {
  const session = {
    claim: CLAIM_WITH_EXPECTED_DELIVERY_DATE
  }

  const expected = {
    expectedDeliveryDate: '2019-03-01'
  }

  const result = requestBody(session)

  t.deepEqual(expected, result, 'adds expected delivery date when claimant is pregnant')
  t.end()
})

test('requestBody() does not add expected delivery date when claimant is not pregnant', (t) => {
  const session = {
    claim: CLAIM_WITHOUT_EXPECTED_DELIVERY_DATE
  }

  const expected = {
    expectedDeliveryDate: null
  }

  const result = requestBody(session)

  t.deepEqual(expected, result, 'does not add expected delivery date when claimant is not pregnant')
  t.end()
})
