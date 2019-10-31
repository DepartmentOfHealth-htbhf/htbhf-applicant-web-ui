const { join, filter, compose } = require('ramda')

const { notIsNilOrEmpty } = require('../../../../../common/predicates')
const { ADDRESS_KEYS } = require('./constants')

const newLineChar = '\n'
const toMultiLineString = compose(join(newLineChar), filter(notIsNilOrEmpty))

const getKeyFromClaim = (claim) => (key) => claim[key]

const addressContentSummary = (req) => ({
  key: req.t('address.summaryKey'),
  value: toMultiLineString(ADDRESS_KEYS.map(getKeyFromClaim(req.session.claim)))
})

module.exports = {
  addressContentSummary
}
