const { getAdditionalDataForStep } = require('../../session-accessors')
const renderView = (step) => (req, res) => {
  res.render(step.template, {
    ...step.pageContent({ translate: req.t }),
    ...getAdditionalDataForStep(req, step),
    // Only set the CSRF token if there is an active session
    csrfToken: req.session ? req.csrfToken() : null
  })
}

module.exports = {
  renderView
}
