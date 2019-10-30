const { getCheckAnswers } = require('./get')
const { CHECK_ANSWERS_URL } = require('../common/constants')
const { handleRequestForPath } = require('../middleware')

const registerCheckAnswersRoutes = (journey, config, app) => {
  app
    .route(CHECK_ANSWERS_URL)
    .get(handleRequestForPath(config, journey), getCheckAnswers(journey.steps))
}

module.exports = {
  registerCheckAnswersRoutes
}
