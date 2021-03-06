const { getPreviousPath } = require('../get-previous-path')

const configureGet = (steps, step) => (req, res, next) => {
  res.locals.previous = getPreviousPath(steps, step, req.session)

  next()
}

module.exports = {
  configureGet
}
