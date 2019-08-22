const { formatDateForDisplay } = require('../common/formatters')

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

const getChildrensDatesOfBirthRows = (localisation) => (children) => {
  const rows = []

  for (let i = 0; i < children.childCount; i++) {
    const index = i + 1
    const nameRow = buildRow(localisation['name'], children[`childDobName-${index}`])
    const dateOfBirthRow = buildRow(localisation['dateOfBirth'], getFormattedDateForChild(children, index))
    rows.push(nameRow, dateOfBirthRow)
  }

  return rows
}

module.exports = {
  getChildrensDatesOfBirthRows
}
