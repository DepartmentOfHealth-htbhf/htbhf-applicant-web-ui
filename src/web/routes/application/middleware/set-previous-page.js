const getPreviousPage = (steps, step) => {
  const index = steps.indexOf(step)

  if (index === -1) {
    throw new Error(`Unable to find ${step} in the list of steps`)
  }

  // first page doesn't have a back link
  if (index > 0) {
    const previousStep = steps[index - 1]
    return previousStep.path
  }
}

const setPreviousPage = (steps, step) => (req, res, next) => {
  res.locals.previous = getPreviousPage(steps, step)

  next()
}

module.exports = {
  getPreviousPage,
  setPreviousPage
}
