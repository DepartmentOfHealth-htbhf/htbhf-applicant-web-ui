const { stateMachine, actions } = require('../common/state-machine')

const handlePostRedirects = (steps) => (req, res, next) => {
  if (res.locals.errors) {
    return next()
  }

  const nextPage = stateMachine.dispatch(actions.GET_NEXT_PATH, req, steps, req.path)
  return res.redirect(nextPage)
}

module.exports = {
  handlePostRedirects
}
