const { stateMachine, actions } = require('../../common/state-machine')

const renderView = (steps, step) => (req, res) => {
  if (req.method === 'POST' && !res.locals.errors) {
    const nextPage = stateMachine.dispatch(actions.GET_NEXT_PATH, req, steps, req.path)
    return res.redirect(nextPage)
  }

  res.render(step.template, {
    ...step.pageContent({ translate: req.t }),
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  renderView
}
