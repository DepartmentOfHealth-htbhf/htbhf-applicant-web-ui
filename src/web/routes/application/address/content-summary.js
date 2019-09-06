const { join, filter, compose } = require('ramda')

const { notIsNilOrEmpty } = require('../../../../common/predicates')

const newLineChar = '\n'
const toMultiLineString = compose(join(newLineChar), filter(notIsNilOrEmpty))

const addressContentSummary = (req) => ({
  key: req.t('address.summaryKey'),
  value: toMultiLineString([
    req.session.claim.addressLine1,
    req.session.claim.addressLine2,
    req.session.claim.townOrCity,
    req.session.claim.county,
    req.session.claim.postcode
  ])
})

module.exports = {
  addressContentSummary
}
