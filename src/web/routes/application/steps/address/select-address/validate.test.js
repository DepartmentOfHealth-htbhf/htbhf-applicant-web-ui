const test = require('tape')
const { addressIsSelectedWhenThereAreAddressResults } = require('./validate')

test('empty selectedAddress field is valid when postcodeLookupResults is empty', (t) => {
  const selectedAddress = ''
  const req = {
    session: {
      postcodeLookupResults: []
    }
  }

  const result = addressIsSelectedWhenThereAreAddressResults(selectedAddress, { req })

  t.equal(result, true)
  t.end()
})

test('empty selectedAddress field is valid when postcodeLookupResults is null', (t) => {
  const selectedAddress = ''
  const req = {
    session: {
      postcodeLookupResults: null
    }
  }

  const result = addressIsSelectedWhenThereAreAddressResults(selectedAddress, { req })

  t.equal(result, true)
  t.end()
})

test('empty selectedAddress field is valid when postcodeLookupResults is undefined', (t) => {
  const selectedAddress = undefined
  const req = {
    session: {
      postcodeLookupResults: null
    }
  }

  const result = addressIsSelectedWhenThereAreAddressResults(selectedAddress, { req })

  t.equal(result, true)
  t.end()
})

test('empty selectedAddress is invalid when there are postcodeLookupResults', (t) => {
  const selectedAddress = ''
  const req = {
    session: {
      postcodeLookupResults: ['Address 1, BS1 1AA']
    }
  }

  const result = addressIsSelectedWhenThereAreAddressResults(selectedAddress, { req })

  t.equal(result, false)
  t.end()
})

test('null selectedAddress is invalid when there are postcodeLookupResults', (t) => {
  const selectedAddress = null
  const req = {
    session: {
      postcodeLookupResults: ['Address 1, BS1 1AA']
    }
  }

  const result = addressIsSelectedWhenThereAreAddressResults(selectedAddress, { req })

  t.equal(result, false)
  t.end()
})

test('undefined selectedAddress is invalid when there are postcodeLookupResults', (t) => {
  const selectedAddress = undefined
  const req = {
    session: {
      postcodeLookupResults: ['Address 1, BS1 1AA']
    }
  }

  const result = addressIsSelectedWhenThereAreAddressResults(selectedAddress, { req })

  t.equal(result, false)
  t.end()
})
