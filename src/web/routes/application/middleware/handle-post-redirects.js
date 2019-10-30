const { stateMachine, actions } = require('../flow-control')

const handlePostRedirects = (journey) => (req, res, next) => {
  if (res.locals.errors) {
    return next()
  }

  const nextPage = stateMachine.dispatch(actions.GET_NEXT_PATH, req, journey.steps)
  return res.redirect(nextPage)
}

module.exports = {
  handlePostRedirects
}
