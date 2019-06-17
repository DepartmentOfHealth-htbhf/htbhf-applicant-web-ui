const { getPathsInSequence } = require('./get-paths-in-sequence')

const isPathInSequence = (steps, path) => getPathsInSequence(steps).includes(path)

module.exports = {
  isPathInSequence
}
