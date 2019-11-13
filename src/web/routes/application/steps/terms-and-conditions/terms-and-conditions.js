const { check } = require('express-validator')
const { getTermsAndConditions } = require('./get')
const { postTermsAndConditions } = require('./post')
const { TERMS_AND_CONDITIONS_URL } = require('../../paths')
const { translateValidationMessage } = require('../common/translate-validation-message')
const { handleRequestForPath } = require('../../flow-control')

const validate = [
  check('agree').equals('agree').withMessage(translateValidationMessage('validation:acceptTermsAndConditions'))
]
const registerTermsAndConditionsRoutes = (csrfProtection, journey, config, app) => {
  app
    .route(TERMS_AND_CONDITIONS_URL)
    .get(csrfProtection, handleRequestForPath(journey), getTermsAndConditions(journey))
    .post(csrfProtection, validate, handleRequestForPath(journey), postTermsAndConditions(config, journey))
}

module.exports = {
  registerTermsAndConditionsRoutes
}
