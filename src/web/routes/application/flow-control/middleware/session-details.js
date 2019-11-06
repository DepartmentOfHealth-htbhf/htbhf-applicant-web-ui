const initialiseProp = (prop, obj, value = {}) => {
  if (!obj.hasOwnProperty(prop)) {
    obj[prop] = value
  }

  return obj
}

const getSessionDetails = (journey) => (req, res, next) => {
  res.locals.claim = req.session.claim
  req.session = initialiseProp('journeys', req.session)
  req.session.journeys = initialiseProp(journey.name, req.session.journeys)
  next()
}

module.exports = {
  getSessionDetails
}
