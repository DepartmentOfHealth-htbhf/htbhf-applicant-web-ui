const { validationResult } = require('express-validator')

const { transformOsPlacesApiResponse } = require('./adapters')
const { auditSuccessfulPostcodeLookup, auditInvalidPostcodeLookup, auditFailedPostcodeLookup, getAddressLookupResults } = require('./os-places')

const { logger } = require('../../../../logger')
const { stateMachine, states } = require('../../common/state-machine')
const { validate } = require('./validate')
const { sanitize } = require('../sanitize')

const ADDRESS_KEYS = ['addressLine1', 'addressLine2', 'townOrCity', 'county', 'postcode']

const resetAddressKey = (address, key) => ({ ...address, [key]: '' })

const resetAddressOnClaim = (claim) => ({ ...claim, ...ADDRESS_KEYS.reduce(resetAddressKey, {}) })

const behaviourForPost = (config) => async (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    return next()
  }

  req.session.claim = resetAddressOnClaim(req.session.claim)

  try {
    const addressLookupResults = await getAddressLookupResults(config, req.body.postcode)

    req.session.postcodeLookupResults = transformOsPlacesApiResponse(addressLookupResults)
    auditSuccessfulPostcodeLookup(config, req, addressLookupResults.header.totalresults)
    return next()
  } catch (error) {
    if (error.statusCode === 400) {
      req.session.postcodeLookupResults = []
      auditInvalidPostcodeLookup(config, req)
      return next()
    }

    auditFailedPostcodeLookup(config, req)
    logger.error(`Error looking up address for postcode: ${error}`)
    req.session.postcodeLookupError = true
    return next()
  }
}

const resetPostcodeLookupError = (req) => {
  if (req.session.postcodeLookupError) {
    delete req.session.postcodeLookupError
  }
}

const behaviourForGet = () => (req, res, next) => {
  resetPostcodeLookupError(req)
  stateMachine.setState(states.IN_PROGRESS, req)
  next()
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
  behaviourForGet,
  toggle: 'ADDRESS_LOOKUP_ENABLED',
  validate,
  sanitize
}

module.exports = {
  postcode,
  behaviourForPost,
  behaviourForGet
}
