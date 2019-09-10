const requestBody = (session) => ({
  address: {
    addressLine1: session.claim.addressLine1,
    addressLine2: session.claim.addressLine2,
    townOrCity: session.claim.townOrCity,
    county: session.claim.county,
    postcode: session.claim.postcode
  }
})

module.exports = {
  requestBody
}
