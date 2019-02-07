const { stateMachine, actions } = require('../state-machine/state-machine')

const renderView = (template, getPageContent, redirect) => (req, res) => {
  if (req.method === 'POST' && !res.locals.errors) {
    const nextPage = stateMachine.dispatch(actions.GET_NEXT_PAGE, req, redirect)
    return res.redirect(nextPage)
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
