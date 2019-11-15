const { stateMachine, states } = require('../../flow-control')
const { CHECK_ANSWERS_URL, prefixPath } = require('../../paths')

const pageContent = ({ translate }) => ({
  title: translate('terms-and-conditions.title'),
  heading: translate('terms-and-conditions.heading'),
  buttonText: translate('buttons:acceptAndSend'),
  termsAndConditions: translate('terms-and-conditions.statement')
})

const render = (req, res, journey) => {
  res.render('terms-and-conditions', {
    ...pageContent({ translate: req.t }),
    csrfToken: req.csrfToken(),
    previous: prefixPath(journey.pathPrefix, CHECK_ANSWERS_URL)
  })
}

const getTermsAndConditions = (journey) => (req, res) => {
  stateMachine.setState(states.IN_REVIEW, req, journey)

  render(req, res, journey)
}

module.exports = {
  render,
  getTermsAndConditions
}
