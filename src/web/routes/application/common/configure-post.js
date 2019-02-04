const configurePost = (req, res, next) => {
  res.locals.errorTitleText = req.t('validation:errorTitleText')
  next()
}

module.exports = {
  configurePost
}
