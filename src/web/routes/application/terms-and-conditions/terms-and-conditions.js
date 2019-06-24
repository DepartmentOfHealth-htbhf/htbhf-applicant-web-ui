const { check } = require('express-validator/check')
const { getTermsAndConditions } = require('./get')
const { postTermsAndConditions } = require('./post')
const { TERMS_AND_CONDITIONS_URL } = require('../common/constants')
const { translateValidationMessage } = require('../common/translate-validation-message')
const { handleRequestForPath } = require('../middleware')

const validate = [
  check('agree').equals('agree').withMessage(translateValidationMessage('validation:acceptTermsAndConditions'))
]
const registerTermsAndConditionsRoutes = (csrfProtection, steps, config, app) => {
  app
    .route(TERMS_AND_CONDITIONS_URL)
    .get(csrfProtection, handleRequestForPath(config, steps), getTermsAndConditions(steps))
    .post(csrfProtection, validate, handleRequestForPath(config, steps), postTermsAndConditions(steps, config))
}

module.exports = {
  registerTermsAndConditionsRoutes
}
