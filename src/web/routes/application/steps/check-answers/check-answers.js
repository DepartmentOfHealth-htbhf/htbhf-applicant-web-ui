const { getCheckAnswers } = require('./get')
const { CHECK_ANSWERS_URL, prefixPath } = require('../../paths')
const { handleRequestForPath } = require('../../flow-control')

const registerCheckAnswersRoutes = (journey, app) => {
  app
    .route(prefixPath(journey.pathPrefix, CHECK_ANSWERS_URL))
    .get(handleRequestForPath(journey), getCheckAnswers(journey))
}

module.exports = {
  registerCheckAnswersRoutes
}
