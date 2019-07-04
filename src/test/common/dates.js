const dateIn3Months = () => {
  const dueDate = new Date()
  dueDate.setDate(1)
  dueDate.setMonth(dueDate.getMonth() + 3)
  return dueDate
}

const dateLastYear = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 1)
  return date
}

module.exports = {
  dateIn3Months,
  dateLastYear
}
