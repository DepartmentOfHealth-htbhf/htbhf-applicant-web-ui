const { getCheckAnswers } = require('./get')
const { CHECK_ANSWERS_URL } = require('../common/constants')
const { handleRequestForPath } = require('../middleware')

const registerCheckAnswersRoutes = (steps, config, app) => {
  app
    .route(CHECK_ANSWERS_URL)
    .get(handleRequestForPath(config, steps), getCheckAnswers(steps))
}

module.exports = {
  registerCheckAnswersRoutes
}
