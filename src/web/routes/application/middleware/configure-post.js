const { getPreviousPath } = require('./get-previous-path')

const configurePost = (steps, step) => (req, res, next) => {
  res.locals.errorTitleText = req.t('validation:errorTitleText')
  res.locals.previous = getPreviousPath(steps, step, req.session)

  next()
}

module.exports = {
  configurePost
}
