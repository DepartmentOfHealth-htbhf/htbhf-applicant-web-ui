const { flatten } = require('ramda')
const { steps } = require('../steps')
const { stateMachine, states } = require('../common/state-machine')
const { createClaimService } = require('../services')

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
  const claimService = createClaimService(req)
  const claim = claimService.get()
  const result = step.contentSummary(req, { claim })
  const applyPathToRow = combinePathWithRow(step.path)

  return Array.isArray(result) ? result.map(applyPathToRow) : [applyPathToRow(result)]
}

const getCheck = (req, res) => {
  const stepArrays = steps.map(getRowData(req))
  const checkRowData = flatten(stepArrays)

  stateMachine.setState(states.IN_REVIEW, req)

  res.render('check', {
    claim: req.session.claim,
    ...pageContent({ translate: req.t }),
    csrfToken: req.csrfToken(),
    checkRowData
  })
}

module.exports = {
  getCheck,
  getRowData
}
