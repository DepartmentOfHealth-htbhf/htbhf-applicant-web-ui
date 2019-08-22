const { stateMachine, states, actions } = require('../common/state-machine')
const { getPreviousPath } = require('../common/get-previous-path')
const { getGroupedRowData } = require('./get-row-data')
const { getChildrensDatesOfBirthRows } = require('./get-childrens-dates-of-birth-rows')

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

const getCheckAnswers = (steps) => (req, res) => {
  const { children } = req.session
  const localisation = pageContent({ translate: req.t })
  const getLocalisedChildrensDatesOfBirthRows = getChildrensDatesOfBirthRows(localisation)

  stateMachine.setState(states.IN_REVIEW, req)
  req.session.nextAllowedStep = stateMachine.dispatch(actions.GET_NEXT_PATH, req, steps)

  res.render('check-answers', {
    ...localisation,
    claimSummaryLists: getGroupedRowData(req, steps),
    childrensDatesOfBirthRows: children ? getLocalisedChildrensDatesOfBirthRows(children) : [],
    previous: getLastNavigablePath(steps, req)
  })
}

module.exports = {
  getCheckAnswers,
  getLastNavigablePath
}
