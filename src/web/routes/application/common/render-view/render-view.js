const { stateMachine } = require('./state-machine')

const renderView = (template, getPageContent, redirect) => (req, res) => {
  if (req.method === 'POST' && !res.locals.errors) {
    return stateMachine.dispatch(req, res, redirect)
  }

  res.render(template, {
    ...getPageContent({ translate: req.t }),
    csrfToken: req.csrfToken(),
    htmlLang: req.language
  })
}

module.exports = {
  renderView
}
