const { stateMachine, actions } = require('../state-machine')

const handlePostRedirects = (journey) => (req, res, next) => {
  if (res.locals.errors) {
    return next()
  }

  const nextPage = stateMachine.dispatch(actions.GET_NEXT_PATH, req, journey)
  return res.redirect(nextPage)
}

module.exports = {
  handlePostRedirects
}
