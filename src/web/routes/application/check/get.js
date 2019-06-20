const { pipe, map, filter, flatten, path, isNil } = require('ramda')
const { notIsNil } = require('../../../../common/predicates')
const { stateMachine, states, actions } = require('../common/state-machine')

const getLastStepPath = (steps) => {
  if (steps) {
    return path(['path'], steps[steps.length - 1])
  } else {
    throw new Error(`steps should be a non empty array, instead got ${steps}`)
  }
}

const pageContent = ({ translate }) => ({
  title: translate('check.title'),
  heading: translate('check.heading'),
  sendApplicationHeader: translate('check.sendApplicationHeader'),
  sendApplicationText: translate('check.sendApplicationText'),
  buttonText: translate('buttons:continue'),
  changeText: translate('check.change')
})

const combinePathWithRow = (path) => (row) => ({
  ...row,
  path
})

const getFlattenedRowData = (req) => pipe(map(getRowData(req)), filter(notIsNil), flatten)

const getRowData = (req) => (step) => {
  if (isNil(step.contentSummary)) {
    return null
  }
  const result = step.contentSummary(req)
  const applyPathToRow = combinePathWithRow(step.path)

  return Array.isArray(result) ? result.map(applyPathToRow) : applyPathToRow(result)
}

const getCheck = (steps) => (req, res) => {
  stateMachine.setState(states.IN_REVIEW, req)

  req.session.nextAllowedStep = stateMachine.dispatch(actions.GET_NEXT_PATH, req, steps)

  res.render('check', {
    claim: req.session.claim,
    ...pageContent({ translate: req.t }),
    checkRowData: getFlattenedRowData(req)(steps),
    previous: getLastStepPath(steps)
  })
}

module.exports = {
  getCheck,
  getRowData,
  getLastStepPath,
  getFlattenedRowData
}
