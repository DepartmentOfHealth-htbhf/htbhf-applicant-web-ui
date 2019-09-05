const { pipe, map, filter, flatten, isNil, groupBy, pathOr, assoc } = require('ramda')
const { notIsNil } = require('../../../../common/predicates')
const { DEFAULT_LIST, SUMMARY_LIST_KEY } = require('./constants')

const SUMMARY_LIST_PATH = [SUMMARY_LIST_KEY]

const getFlattenedRowData = (req) => pipe(map(getRowData(req)), filter(notIsNil), flatten)

const applyPathToRow = (step, result) => {
  const assocStepPath = assoc('path', step.path)
  return Array.isArray(result) ? result.map(assocStepPath) : assocStepPath(result)
}

const getRowData = (req) => (step) => {
  if (isNil(step.contentSummary)) {
    return null
  }
  const result = step.contentSummary(req)
  return isNil(result) ? null : applyPathToRow(step, result)
}

const listPath = pathOr(DEFAULT_LIST, SUMMARY_LIST_PATH)

const groupRowData = groupBy(listPath)

const getGroupedRowData = (req, steps) => {
  const flattened = getFlattenedRowData(req)(steps)
  return groupRowData(flattened)
}

module.exports = {
  getRowData,
  getFlattenedRowData,
  groupRowData,
  getGroupedRowData
}
