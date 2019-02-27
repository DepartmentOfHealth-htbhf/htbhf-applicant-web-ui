const getPreviousPage = require('./get-previous-page')

const configureGet = (steps, step) => (req, res, next) => {
  res.locals.previous = getPreviousPage(steps, step)

  next()
}

module.exports = {
  configureGet
}
