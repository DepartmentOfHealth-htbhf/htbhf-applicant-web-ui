const { formatDateForDisplay } = require('../common/formatters')
const { NAME_KEY, DATE_OF_BIRTH_KEY } = require('./constants')

const buildRow = (keyText, valueText) => ({
  key: {
    text: keyText
  },
  value: {
    text: valueText
  }
})

const getFormattedDateForChild = (children, index) =>
  formatDateForDisplay(
    children[`childDob-${index}-day`],
    children[`childDob-${index}-month`],
    children[`childDob-${index}-year`]
  )

const getChildrensDatesOfBirthRows = (children) => {
  const rows = []

  for (let i = 0; i < children.childCount; i++) {
    const index = i + 1
    const nameRow = buildRow(NAME_KEY, children[`childDobName-${index}`])
    const dateOfBirthRow = buildRow(DATE_OF_BIRTH_KEY, getFormattedDateForChild(children, index))
    rows.push(nameRow, dateOfBirthRow)
  }

  return rows
}

module.exports = {
  getChildrensDatesOfBirthRows
}
