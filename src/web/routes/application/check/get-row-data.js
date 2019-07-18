const { pipe, map, filter, flatten, isNil, groupBy, pathOr } = require('ramda')
const { notIsNil } = require('../../../../common/predicates')
const { DEFAULT_LIST, SUMMARY_LIST_KEY } = require('./constants')

const SUMMARY_LIST_PATH = [SUMMARY_LIST_KEY]

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
