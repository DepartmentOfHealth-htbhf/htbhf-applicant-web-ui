const { assoc, compose, filter, flatten, isNil, groupBy, propOr } = require('ramda')
const { notIsNil } = require('../../../../common/predicates')
const { DEFAULT_LIST, SUMMARY_LIST_KEY } = require('./constants')

const assocPathWithContentSummary = (path, summary) => {
  const assocPathProp = assoc('path', path)
  return Array.isArray(summary) ? summary.map(assocPathProp) : assocPathProp(summary)
}

const getContentSummary = (req) => (step) => {
  const summary = isNil(step.contentSummary) ? null : step.contentSummary(req)
  return isNil(summary) ? null : assocPathWithContentSummary(step.path, summary)
}

const getSummaryListRows = ({ req, steps }) => steps.map(getContentSummary(req))

const normaliseRows = compose(flatten, filter(notIsNil))

const listProp = propOr(DEFAULT_LIST, SUMMARY_LIST_KEY)

const groupByList = groupBy(listProp)

const getSummaryListsForSteps = compose(groupByList, normaliseRows, getSummaryListRows)

module.exports = {
  getContentSummary,
  getSummaryListRows,
  normaliseRows,
  groupByList,
  getSummaryListsForSteps
}
