const { path } = require('ramda')

const getNextForStep = (req, step) => {
  const next = path(['next'], step)

  if (typeof next !== 'function') {
    throw new Error('Next property for step must be a function')
  }

  const nextPath = next(req)

  if (typeof nextPath !== 'string') {
    throw new Error('Next function must return a string')
  }

  if (!nextPath.startsWith('/')) {
    throw new Error('Next path must start with a forward slash')
  }

  return nextPath
}

module.exports = {
  getNextForStep
}
