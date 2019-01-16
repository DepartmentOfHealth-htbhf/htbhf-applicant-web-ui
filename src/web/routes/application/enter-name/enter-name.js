const { renderView } = require('../common/render-view')
const { handlePost } = require('../common/handle-post')
const { validate } = require('./validate')
const { getSessionDetails } = require('../common/session-details')
const { sanitize } = require('./sanitize')

const pageContent = {
  title: 'What is your name?',
  heading: 'What is your name?',
  formDescription: 'Tell us your full legal name as it appears on your passport or other benefit claims.'
}

const renderEnterName = renderView('enter-name', pageContent, 'confirm')

const registerEnterNameRoutes = (csrfProtection, app) => {
  app
    .route('/enter-name')
    .get(
      csrfProtection,
      getSessionDetails,
      renderEnterName
    )

    .post(
      csrfProtection,
      sanitize,
      validate,
      getSessionDetails,
      handlePost,
      renderEnterName
    )
}

module.exports = {
  registerEnterNameRoutes
}
