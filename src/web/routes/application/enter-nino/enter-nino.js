const { renderView } = require('../common/render-view')
const { handlePost } = require('../common/handle-post')
const { getSessionDetails } = require('../common/session-details')

const pageContent = {
  title: 'What is your national insurance number?',
  heading: 'What is your national insurance number?',
  hint: 'It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.'
}

const renderEnterNino = renderView('enter-nino', pageContent, 'confirm')

const registerEnterNinoRoutes = (csrfProtection, app) => {
  app
    .route('/enter-nino')
    .get(
      csrfProtection,
      getSessionDetails,
      renderEnterNino
    )

    .post(
      csrfProtection,
      getSessionDetails,
      handlePost,
      renderEnterNino
    )
}

module.exports = {
  registerEnterNinoRoutes
}
