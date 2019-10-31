/**
 * `translateValidationMessage()` follows the express-validator signature for
 * defining custom validation messages. `req.t()` is the internationalisation
 * function provided by i18next-express-middleware.
 *
 * - https://express-validator.github.io/docs/custom-error-messages.html
 * - https://github.com/i18next/i18next-express-middleware
 */
const translateValidationMessage = message => (value, { req }) => req.t(message)

module.exports = {
  translateValidationMessage
}
