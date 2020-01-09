const { ADDRESS_LINE_1_KEY, ADDRESS_LINE_2_KEY, TOWN_OR_CITY_KEY, COUNTY_KEY, POSTCODE_KEY } = require('./constants')

const requestBody = (session) => ({
  address: {
    [ADDRESS_LINE_1_KEY]: session.claim[ADDRESS_LINE_1_KEY],
    [ADDRESS_LINE_2_KEY]: session.claim[ADDRESS_LINE_2_KEY],
    [TOWN_OR_CITY_KEY]: session.claim[TOWN_OR_CITY_KEY],
    [COUNTY_KEY]: session.claim[COUNTY_KEY],
    [POSTCODE_KEY]: session.claim.sanitizedPostcode
  }
})

module.exports = {
  requestBody
}
