const getSessionDetails = (req, res, next) => {
  res.locals.claim = req.session.claim
  next()
}

module.exports = {
  getSessionDetails
}
