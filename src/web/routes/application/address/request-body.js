const { ADDRESS_KEYS } = require('./constants')

const getAddressFieldFromClaim = (claim) => (address, key) => ({ ...address, [key]: claim[key] })

const requestBody = (session) => ({
  address: ADDRESS_KEYS.reduce(getAddressFieldFromClaim(session.claim), {})
})

module.exports = {
  requestBody
}
