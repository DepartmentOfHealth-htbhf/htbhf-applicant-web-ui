const { getCheckAnswers } = require('./get')
const { CHECK_ANSWERS_URL } = require('../../paths')
const { handleRequestForPath } = require('../../flow-control')

const registerCheckAnswersRoutes = (journey, app) => {
  app
    .route(CHECK_ANSWERS_URL)
    .get(handleRequestForPath(journey), getCheckAnswers(journey))
}

module.exports = {
  registerCheckAnswersRoutes
}
