const { flatten, path, isNil } = require('ramda')
const { notIsNil } = require('../../../../common/predicates')
const { stateMachine, states } = require('../common/state-machine')

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
  buttonText: translate('buttons:acceptAndSend'),
  changeText: translate('check.change')
})

const combinePathWithRow = (path) => (row) => ({
  ...row,
  path
})

const getRowData = (req) => (step) => {
  if (isNil(step.contentSummary)) {
    return null
  }

  const result = step.contentSummary(req)

  const applyPathToRow = combinePathWithRow(step.path)

  return Array.isArray(result) ? result.map(applyPathToRow) : applyPathToRow(result)
}

const getCheck = (steps) => (req, res) => {
  const stepArrays = steps.map(getRowData(req)).filter(notIsNil)
  const checkRowData = flatten(stepArrays)

  stateMachine.setState(states.IN_REVIEW, req)

  res.render('check', {
    claim: req.session.claim,
    ...pageContent({ translate: req.t }),
    csrfToken: req.csrfToken(),
    checkRowData,
    previous: getLastStepPath(steps)
  })
}

module.exports = {
  getCheck,
  getRowData,
  getLastStepPath
}
