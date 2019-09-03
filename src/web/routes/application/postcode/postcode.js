const request = require('request-promise')
const { wrapError } = require('../common/formatters')
const { transformOsPlacesApiResponse } = require('./adapters')

const OS_PLACES_API_PATH = '/places/v1/addresses/postcode'

const REQUEST_TIMEOUT = 5000

const standardisePostcode = (postcode) => postcode.toUpperCase().replace(/\s/g, '')

const behaviourForPost = (config) => async (req, res, next) => {
  const { OS_PLACES_URI, OS_PLACES_API_KEY } = config.environment
  const { postcode } = req.body
  const standardisedPostcode = standardisePostcode(postcode)

  try {
    const addressLookupResults = await request({
      uri: `${OS_PLACES_URI}${OS_PLACES_API_PATH}?postcode=${standardisedPostcode}&key=${OS_PLACES_API_KEY}`,
      json: true,
      timeout: REQUEST_TIMEOUT
    })

    req.session.postcodeLookupResults = transformOsPlacesApiResponse(addressLookupResults)
    return next()
  } catch (error) {
    return next(wrapError({
      cause: error,
      message: 'Error looking up address for postcode'
    }))
  }
}

const pageContent = ({ translate }) => ({
  title: translate('postcode.title'),
  heading: translate('postcode.heading'),
  formDescription: translate('postcode.formDescription'),
  postcodeLabel: translate('postcode.postcodeLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('postcode.explanation')
})

const postcode = {
  path: '/postcode',
  template: 'postcode',
  pageContent,
  behaviourForPost,
  toggle: 'ADDRESS_LOOKUP_ENABLED'
}

module.exports = {
  postcode,
  behaviourForPost,
  standardisePostcode
}
