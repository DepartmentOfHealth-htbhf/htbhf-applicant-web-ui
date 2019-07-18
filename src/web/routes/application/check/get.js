const { stateMachine, states, actions } = require('../common/state-machine')
const { getPreviousPath } = require('../common/get-previous-path')
const { getGroupedRowData } = require('./get-row-data')

const pageContent = ({ translate }) => ({
  title: translate('check.title'),
  heading: translate('check.heading'),
  sendApplicationHeader: translate('check.sendApplicationHeader'),
  sendApplicationText: translate('check.sendApplicationText'),
  buttonText: translate('buttons:continue'),
  changeText: translate('check.change'),
  summaryListHeadings: {
    aboutYou: translate('check.aboutYou'),
    aboutYourChildren: translate('check.aboutYourChildren')
  }
})

// a step is navigable if it hasn't defined an isNavigable function.
const stepIsNavigable = (step, session) => !step.hasOwnProperty('isNavigable') || step.isNavigable(session)

const getLastNavigablePath = (steps, req) => {
  const lastStep = steps[steps.length - 1]

  return stepIsNavigable(lastStep, req.session)
    ? lastStep.path
    : getPreviousPath(steps, lastStep, req.session)
}

const getCheck = (steps) => (req, res) => {
  stateMachine.setState(states.IN_REVIEW, req)

  req.session.nextAllowedStep = stateMachine.dispatch(actions.GET_NEXT_PATH, req, steps)

  res.render('check', {
    claim: req.session.claim,
    ...pageContent({ translate: req.t }),
    checkRowData: getGroupedRowData(req, steps),
    previous: getLastNavigablePath(steps, req)
  })
}

module.exports = {
  getCheck,
  getLastNavigablePath
}
