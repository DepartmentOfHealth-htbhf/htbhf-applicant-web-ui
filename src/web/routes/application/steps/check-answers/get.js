const { stateMachine, states, actions } = require('../../flow-control')
const { getPreviousPath } = require('../../flow-control')
const { getSummaryListsForSteps } = require('./get-row-data')
const { getChildrensDatesOfBirthRows } = require('./get-childrens-dates-of-birth-rows')

const { INCREMENT_NEXT_ALLOWED_PATH } = actions
const { IN_REVIEW } = states

const pageContent = ({ translate }) => ({
  title: translate('checkAnswers.title'),
  heading: translate('checkAnswers.heading'),
  sendApplicationHeader: translate('checkAnswers.sendApplicationHeader'),
  sendApplicationText: translate('checkAnswers.sendApplicationText'),
  buttonText: translate('buttons:continue'),
  changeText: translate('change'),
  summaryListHeadings: {
    aboutYou: translate('checkAnswers.aboutYou'),
    aboutYourChildren: translate('checkAnswers.aboutYourChildren')
  },
  childrensDobHiddenText: translate('childDateOfBirth.summaryKey'),
  name: translate('checkAnswers.name'),
  dateOfBirth: translate('checkAnswers.dateOfBirth')
})

// a step is navigable if it hasn't defined an isNavigable function.
const stepIsNavigable = (step, session) => !step.hasOwnProperty('isNavigable') || step.isNavigable(session)

const getLastNavigablePath = (steps, req) => {
  const lastStep = steps[steps.length - 1]

  return stepIsNavigable(lastStep, req.session)
    ? lastStep.path
    : getPreviousPath(steps, lastStep, req.session)
}

const getCheckAnswers = (journey) => (req, res) => {
  const { children } = req.session
  const localisation = pageContent({ translate: req.t })
  const getLocalisedChildrensDatesOfBirthRows = getChildrensDatesOfBirthRows(localisation)
  const { steps } = journey

  stateMachine.setState(IN_REVIEW, req, journey)
  stateMachine.dispatch(INCREMENT_NEXT_ALLOWED_PATH, req, journey)

  res.render('check-answers', {
    ...localisation,
    claimSummaryLists: getSummaryListsForSteps({ req, steps }),
    childrensDatesOfBirthRows: children ? getLocalisedChildrensDatesOfBirthRows(children) : [],
    previous: getLastNavigablePath(steps, req)
  })
}

module.exports = {
  getCheckAnswers,
  getLastNavigablePath
}
